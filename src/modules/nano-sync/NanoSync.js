import axios from 'axios';
import {RSA} from 'react-native-rsa-native';
import {APP_URL, CLIENT_ID, CLIENT_SECRET} from '../../../../../nano.config';
import Base64 from '../../utils/Base64';
import {DATABASE_CONSTANTS} from '../../utils/Utilities';
import getDatabase from '../database/RealmDatabase';

const BASE_URL = 'https://nanoapp.dev/';
// const BASE_URL = 'http://192.168.0.5:8400/';
const GET_TOKEN_URL = BASE_URL + 'auth/token/';
const FETCH_ALL_SCREENS = APP_URL;
const Realm = getDatabase();

export const getAuthTokenAndStoreInRealm = () => {
  if (
    CLIENT_ID == null ||
    CLIENT_SECRET == null ||
    CLIENT_SECRET == 'secret' ||
    CLIENT_ID == 'id'
  ) {
    return null;
  }
  const secret = Base64.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

  const body = {
    grant_type: 'client_credentials',
  };
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    Authorization: 'Basic ' + secret,
  };
  // console.log('pinging for auth', secret, GET_TOKEN_URL);

  return axios({
    method: 'POST'.toLowerCase(),
    url: GET_TOKEN_URL,
    data: body,
    headers: headers,
  })
    .then(json => {
      // console.log('response', json.data);
      if (json != null && json.data != null && json.data.access_token != null) {
        const curr = Date.now();
        const expiryTime = json.data.expires_in * 1000 + curr;

        Realm.setNanoConfig(
          DATABASE_CONSTANTS.EXPIRY_TIME_STAMP,
          expiryTime + '',
        );
        Realm.setNanoConfig(DATABASE_CONSTANTS.AUTH, json.data.access_token);
        Realm.setNanoConfig(DATABASE_CONSTANTS.PUBLIC_KEY, json.data.key);

        return json.data.access_token;
      }
    })
    .catch(err => {
      // console.log('get auth error', err);

      console.log(err);
    });
};
const checkValidityAndGetAuth = async () => {
  let authToken = Realm.getNanoConfig(DATABASE_CONSTANTS.AUTH);
  let expiryTime = Realm.getNanoConfig(DATABASE_CONSTANTS.EXPIRY_TIME_STAMP);
  const curr = Date.now();
  // console.log('helllo', authToken, expiryTime);

  if (
    authToken == null ||
    expiryTime == null ||
    authToken['value'] === null ||
    expiryTime['value'] < curr
  ) {
    authToken = {};

    authToken['value'] = await getAuthTokenAndStoreInRealm();
  }
  return authToken['value'];
};
const isDataVerified = async ({message, signature}) => {
  const publicKeyObj = Realm.getNanoConfig(DATABASE_CONSTANTS.PUBLIC_KEY);
  const publicKey = Base64.atob(publicKeyObj['value']);

  const isVerified = await RSA.verifyWithAlgorithm(
    signature,

    message,

    publicKey,
    RSA.SHA256withRSA,
  ).catch(e => {
    console.log('err', e);
  });

  return isVerified;
};

export const fetchScreen = async ({screenUrl}) => {
  const auth = await checkValidityAndGetAuth();
  if (auth == null) {
    return null;
  }
  if (screenUrl) {
    const existingScreenCodeObj = Realm.getNanoConfig(screenUrl);
    if (
      existingScreenCodeObj != null &&
      existingScreenCodeObj['signature'] != null &&
      existingScreenCodeObj['json'] != null
    ) {
    }
  }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + auth,
    code_hash: '',
  };

  return axios({
    method: 'POST'.toLowerCase(),
    url: screenUrl,
    headers: headers,
  })
    .then(async json => {
      // console.log('data', json.data);
      if (json != null && json.status == 200) {
        // const publicKeyObj = Realm.getNanoConfig(
        //   DATABASE_CONSTANTS.PUBLIC_KEY,
        // );
        // const publicKey = Base64.atob(publicKeyObj['value']);

        // const isVerified = await RSA.verifyWithAlgorithm(
        //   json.data.data.signature,

        //   json.data.data.json,

        //   publicKey,
        //   RSA.SHA256withRSA,
        // ).catch(e => {
        //   console.log('err', e);
        // });
        // console.log('hello', json.data.data.signature, json.data.data.json);

        const isVerified = await isDataVerified({
          message: json.data.data.json,
          signature: json.data.data.signature,
        });
        if (isVerified) {
          console.log('response', json.data.data);

          const decoded = Base64.atob(json.data.data.json);
          const parsed = JSON.parse(decoded);
          Realm.setNanoConfig(screenUrl, JSON.stringify(json.data.data));
          return parsed;
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('errowwr', err);
      return null;
    });
};
export const fetchScreenAndStoreInDb = async ({screenUrl, code_hash = ''}) => {
  const auth = await checkValidityAndGetAuth();
  if (auth == null) {
    return null;
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + auth,
    code_hash,
  };

  return axios({
    method: 'POST'.toLowerCase(),
    url: screenUrl,
    headers: headers,
  })
    .then(async json => {
      // console.log('data', json.data);
      if (json != null && json.status == 200) {
        // const publicKeyObj = Realm.getNanoConfig(
        //   DATABASE_CONSTANTS.PUBLIC_KEY,
        // );
        // const publicKey = Base64.atob(publicKeyObj['value']);

        // const isVerified = await RSA.verifyWithAlgorithm(
        //   json.data.data.signature,

        //   json.data.data.json,

        //   publicKey,
        //   RSA.SHA256withRSA,
        // ).catch(e => {
        //   console.log('err', e);
        // });
        // console.log('hello', json.data.data.signature, json.data.data.json);

        const isVerified = await isDataVerified({
          message: json.data.data.json,
          signature: json.data.data.signature,
        });
        if (isVerified) {
          const decoded = Base64.atob(json.data.data.json);
          const parsedCode = JSON.parse(decoded);
          // console.log('parsed', parsedCode);

          Realm.setNanoConfig(screenUrl, JSON.stringify(json.data.data));
          return parsedCode;
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('errowwr', err);
      return null;
    });
};
export const fetchScreenFromDb = async ({screenUrl}) => {
  const auth = await checkValidityAndGetAuth();
  if (auth == null) {
    return null;
  }
  if (screenUrl) {
    const existingScreenCodeObj = Realm.getNanoConfig(screenUrl);
    // console.log('existinfnf', existingScreenCodeObj);

    if (
      existingScreenCodeObj != null &&
      existingScreenCodeObj['value'] != null
    ) {
      const parsed = JSON.parse(existingScreenCodeObj['value']);
      if (parsed['signature'] != null && parsed['json'] != null) {
        const decoded = Base64.atob(parsed['json']);
        if (decoded) {
          const parsedCode = JSON.parse(decoded);
          if (parsedCode) {
            fetchScreenAndStoreInDb({
              screenUrl,
              code_hash: parsed['signature'],
            });
            return parsedCode;
          }
        }
      }
    }
  }
  // console.log('refetching screen');

  return await fetchScreenAndStoreInDb({screenUrl});
};

export const fetchAllScreens = async () => {
  const auth = await checkValidityAndGetAuth();
  if (auth == null) {
    return null;
  }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + auth,
  };
  // console.log('all screens url', FETCH_ALL_SCREENS, auth);

  return axios({
    method: 'POST'.toLowerCase(),
    url: FETCH_ALL_SCREENS,
    headers: headers,
  })
    .then(async json => {
      // console.log('screeens', json);

      if (json != null && json.status == 200) {
        const isVerified = await isDataVerified({
          message: json.data.data.config,
          signature: json.data.data.signature,
        });
        if (isVerified) {
          const decoded = Base64.atob(json.data.data.config);
          const parsed = JSON.parse(decoded);

          return parsed;
        } else {
          return null;
        }

        // return json.data.data;
      } else {
        return null;
      }
    })
    .catch(err => {
      // console.log('fetch all screens error', err);
      return null;
    });
};
