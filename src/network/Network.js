import axios from 'axios';
import {getDatabase} from '../database/RealmDatabase';
import Base64 from '../utils/Base64';
import {DATABASE_CONSTANTS} from '../utils/Utilities';

const BASE_URL = 'http://192.168.0.6:8400/';
const GET_TOKEN_URL = BASE_URL + 'o/token/';
const Realm = getDatabase();
export const getAuthTokenAndStoreInRealm = async () => {
  const clientId = Realm.getNanoConfig(DATABASE_CONSTANTS.CLIENT_ID);
  console.log('network  client id', clientId);

  const clientSecret = Realm.getNanoConfig(DATABASE_CONSTANTS.CLIENT_SECRET);
  const secret = Base64.btoa(clientId + ':' + clientSecret);
  // console.log(
  //   ' ckecking',
  //   secret.includes(
  //     'NDRqTnJsSWJaOWppZ0JFaXZ4TFNjejJ4eUVDQURFM29VRjBtSWVqUDo5TjI3ZTJLZDZRZ215MGdDenVLVEUxcTE3OHBkOXM5WTRDWDBpYk5vUW9jTGk3MGNxWHNMdjh3QklhSDFXek5halFtdnVhU0RiSGc2M1ZSNXl4ZGZRdkl2Q0VCdUlGU2ZqR2NWQ1M3WWNsZUhXNFZ0Zm5iUmE5Z0VnRVZLUEFjVQ==',
  //   ),
  // );
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
        return Realm.setNanoConfig(
          DATABASE_CONSTANTS.AUTH,
          json.data.access_token,
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const fetchScreen = async screenUrl => {
  let authToken = Realm.getNanoConfig(DATABASE_CONSTANTS.AUTH);
  console.log('auth tojen', authToken);

  if (authToken === null) {
    // console.log(' auth is null so getting it');
    authToken = await getAuthTokenAndStoreInRealm();
  }
  console.log(' retreived auth', authToken);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: 'Bearer ' + authToken,
  };
  return axios({
    method: 'GET'.toLowerCase(),
    url: screenUrl,
    headers: headers,
  })
    .then(json => {
      // console.log('ssss', json);

      if (json != null && json.status == 200) {
        return json.data.data;
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('error', err);
      return null;
    });
};
