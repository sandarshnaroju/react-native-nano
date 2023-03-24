import axios from 'axios';
import {RSA} from 'react-native-rsa-native';
import {APP_URL, CLIENT_ID, CLIENT_SECRET} from '../../../../nano.config';
import Base64 from '../../utils/Base64';
import {DATABASE_CONSTANTS} from '../../utils/Utilities';
import getDatabase from '../database/RealmDatabase';

const BASE_URL = 'https://nanoapp.dev/';
const GET_TOKEN_URL = BASE_URL + 'auth/token/';
const FETCH_ALL_SCREENS = BASE_URL + APP_URL;
const Realm = getDatabase();

export const getAuthTokenAndStoreInRealm = () => {
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
      console.log(err);
    });
};
const checkValidityAndGetAuth = async () => {
  let authToken = Realm.getNanoConfig(DATABASE_CONSTANTS.AUTH);
  let expiryTime = Realm.getNanoConfig(DATABASE_CONSTANTS.EXPIRY_TIME_STAMP);
  const curr = Date.now();

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
// const signAlgoDemo = async () => {
//   let secret =
//     'ew0KICAgICJuYW1lIjogIkhlbGxvV29ybGQiLA0KICAgICJzY3JlZW4iOiB7DQogICAgICAgICJ2MSI6IFsNCiAgICAgICAgICAgIHsNCiAgICAgICAgICAgICAgICAiY29tcG9uZW50IjogInRleHQiLA0KICAgICAgICAgICAgICAgICJ2YWx1ZSI6ICJIZWxsbyBXb3JsZCIsDQogICAgICAgICAgICAgICAgInByb3BzIjogew0KICAgICAgICAgICAgICAgICAgICAic3R5bGUiOiB7DQogICAgICAgICAgICAgICAgICAgICAgICAiZm9udFNpemUiOiAzMCwNCiAgICAgICAgICAgICAgICAgICAgICAgICJhbGlnblNlbGYiOiAiY2VudGVyIiwNCiAgICAgICAgICAgICAgICAgICAgICAgICJqdXN0aWZ5Q29udGVudCI6ICJjZW50ZXIiLA0KICAgICAgICAgICAgICAgICAgICAgICAgImZvbnRXZWlnaHQiOiAiYm9sZCINCiAgICAgICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgIH0sDQogICAgICAgICAgICAgICAgIm9uQ2xpY2siOiAiKHsgbmF2aWdhdGlvbiwgdWlFbGVtZW50cyB9KSA9PiB7XG4gICAgICAgXG4gICAgICAgIHJldHVybiB1aUVsZW1lbnRzO1xuICAgIH0iLA0KICAgICAgICAgICAgICAgICJvbkxvbmdDbGljayI6ICIoeyBuYXZpZ2F0aW9uLCB1aUVsZW1lbnRzIH0pID0+IHtcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIHVpRWxlbWVudHM7XG4gICAgfSINCiAgICAgICAgICAgIH0NCiAgICAgICAgXQ0KICAgIH0sDQogICAgInN0eWxlIjogew0KICAgICAgICAianVzdGlmeUNvbnRlbnQiOiAiY2VudGVyIiwNCiAgICAgICAgImZsZXgiOiAxDQogICAgfQ0KfQ==';
//   let privateey = `-----BEGIN RSA PRIVATE KEY-----
//   MIIEowIBAAKCAQEA7OQLYNIM1Kx4yrcc//4XKuAMEWoI4rplxU4PUdLIL11juTCj
//   sfbZsdphvp9A5HlVTwKbjyGGtistR7YiFwiEajXrLG/qUKC+XROBWH04LLf609EY
//   HmoUav51pgk85oFh4mYkfZnMt+SzpsMLSyBoq17HTqAHFod2OsmT1sNpxCmLQCIN
//   xH8VX32Y/+O/mhhPvX4WHnipTWTVcv36Hnn0N741pJq8MweQEFpG2Ka10a5dP/ro
//   3lY3DZ8WgyHvmMmMkRjHvsdvzR6NnzsxN4jd2tQ9lKsXrBgCLRFi+Su4z2xZiamq
//   Y6y+7a8rkvF3JYZFIKFirW1UvazCubs4uhVF7wIDAQABAoIBABU7S9Zwgmw4oxY5
//   euoUv3B9Joe/CFnYg/uUR0+O7piULGEc6LxawrXWkVvQ5ojeY7988oKjFMb/Wq5q
//   jBFNbEogAq/NE2QI7Cw9GHgyYkEGd6mEEZR+7yKMePCZ3lv4glSU0WDH0pnexR1F
//   WPNG+H/3iDHV/5yiJSjCsrM/zhshw+4TjRPHVqJZFCvYPEp/o0umB8bPMrCGQCiF
//   0BzIp/lJOkQtFgTqYgXhBbOuGrUfzZw3PVColLYYEqd9Q4e7/1OlWsrDZfrebaow
//   MkA11nb7U1wGwqnmodJhozvxGFRxKYsTVCPwXTFhFiIAx84TGMxyC28zWDowvBvA
//   uAqu4Y0CgYEA8g+6g9YSLVaI4RntcomfvOWoxmFzJUOmoqItFKdhDD9whlThEvAZ
//   JmXQ2fwdMiYAsyHkj2N5vj8yCeZRKZoJRThUgEMlbgh3Wz4cZXZsX4oVCP8h3T63
//   2RvuGhoHzOMybkvboJH/4dMimH3YC7fhZrp0VJJSjjidbEkqO4UC3DsCgYEA+ogY
//   Mj/g8WeNE6xT1sqUz1apE+9NlJybLcM9uYsy/nJismU/SSkc0SK3Hl3g50UXK0Z5
//   PtzCveKfIyKTYOO+LUGJSPAV/idWKOb4Wdqag37CDXA7HnYuWYfhvsDV8ITn0PNP
//   9R6zcj3nlxD94itowjTNmyULPcEgWeIhNRPwBd0CgYBOQ/OkiOTbr+0WC1IRBJqX
//   cxI9Amk+lT8dup4k3XGtih2R8YPMocEf/y+mK7Qs8MitIrpJ+nn0n25IcSWw89Mn
//   hG0eA5fomegtokmALOghg/4FKKkEZjD/i95SpjP7dUJrEy/yHQLFO4UmFRpzv4Kr
//   uoG+jokO3xNXXdi/4ePo3QKBgHXpqeG0mO1lfEufFtKIBCPVuLwuLAhe8NZIBvwV
//   3MlPEs69wlxvoiV4PlFng9u1c+MlRxlkE7AFQjrqIg0/AxoPt0qB3QgCgZW8p3S6
//   43AyL6jdgqWin8v5nTEHV2ndU7HPYnmOmoyRQDekgql5HtQQwBheBf1psQ081b5C
//   hPxtAoGBAL3elUXqMS4F81wHVLGYodEoEN/CyBdwgNs5gllbChXmXiqYVxaUl2Ba
//   VytfhyuHDhrSJuA85JcAPVw+vHcDFIobZJ9My4x55yWC7mVO0n9ff17x3658MUDx
//   C1UZlOci4JAMC7kRsiWMIz6V5K2UiVeYSuZrCeErTvox8WwaeHmU
//   -----END RSA PRIVATE KEY-----`;
//   let publickey = `-----BEGIN PUBLIC KEY-----
//   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7OQLYNIM1Kx4yrcc//4X
//   KuAMEWoI4rplxU4PUdLIL11juTCjsfbZsdphvp9A5HlVTwKbjyGGtistR7YiFwiE
//   ajXrLG/qUKC+XROBWH04LLf609EYHmoUav51pgk85oFh4mYkfZnMt+SzpsMLSyBo
//   q17HTqAHFod2OsmT1sNpxCmLQCINxH8VX32Y/+O/mhhPvX4WHnipTWTVcv36Hnn0
//   N741pJq8MweQEFpG2Ka10a5dP/ro3lY3DZ8WgyHvmMmMkRjHvsdvzR6NnzsxN4jd
//   2tQ9lKsXrBgCLRFi+Su4z2xZiamqY6y+7a8rkvF3JYZFIKFirW1UvazCubs4uhVF
//   7wIDAQAB
//   -----END PUBLIC KEY-----`;
//   console.log('signAlgoDemo');
//   // const keys = await RSA.generate();
//   // console.log('public', keys.public, keys.private);

//   const signature = await RSA.signWithAlgorithm(
//     secret,
//     privateey,
//     RSA.SHA256withRSA,
//   ).catch(e => {
//     console.log('sign er', e);
//   });
//   // const decodedSignature = Base64.atob(signature);
//   console.log('signature', signature, publickey);

//   const valid = await RSA.verifyWithAlgorithm(
//     signature,
//     secret,
//     publickey,
//     RSA.SHA256withRSA,
//   ).catch(e => {
//     console.log('verify er', e);
//   });
//   console.log('verified', valid);
//   // try {
//   //   await RSA.verifyWithAlgorithm(
//   //     signature,
//   //     'wrong message',
//   //     keys.public,
//   //     RSA.SHA256withRSA,
//   //   );
//   //   console.log('NOTE!! Something went wrong, verify should have been failed');
//   // } catch (err) {
//   //   console.log('verify fails correctly: ', err);
//   // }
// };
export const fetchScreen = async ({screenUrl}) => {
  const auth = await checkValidityAndGetAuth();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + auth,
  };

  return axios({
    method: 'POST'.toLowerCase(),
    url: screenUrl,
    headers: headers,
  })
    .then(async json => {
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
          const parsed = JSON.parse(decoded);

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

export const fetchAllScreens = async () => {
  const auth = await checkValidityAndGetAuth();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + auth,
  };
  return axios({
    method: 'POST'.toLowerCase(),
    url: FETCH_ALL_SCREENS,
    headers: headers,
  })
    .then(async json => {
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
      console.log('error', err);
      return null;
    });
};
