import RNNano from './src/navigation/screen/Screens';
import NANO from './src/utils/Constants';
import Nano from './src/navigation/screen/GenericScreen';

import {
  fetchScreenAndStoreInDb,
  registerFirebase,
} from './src/modules/nano-sync/NanoSync';
import getFirebase from './src/modules/firebase/Firebase';
const Firebase = getFirebase();
export {RNNano, NANO, Nano};

const firebaseBackGroundCallback = async remoteMessage => {
  // console.log('backgrrround');

  if (
    remoteMessage != null &&
    remoteMessage['data'] != null &&
    remoteMessage['data']['updated'] != null
  ) {
    const changedScreen = JSON.parse(remoteMessage['data']['updated']);
    fetchScreenAndStoreInDb({
      screenUrl: changedScreen['url'],
      code_hash: remoteMessage['data']['code_hash'],
    });
  }
};
if (Firebase) {
  Firebase.getToken()
    .then(token => {
      registerFirebase({token});
      Firebase.getBackgroundHandler(firebaseBackGroundCallback);
    })
    .catch(e => {
      console.log('error', e);
    });
}
// messaging.default().setBackgroundMessageHandler(async remoteMessage => {
// if (
//   remoteMessage != null &&
//   remoteMessage['data'] != null &&
//   remoteMessage['data']['updated'] != null
// ) {
//   const changedScreen = JSON.parse(remoteMessage['data']['updated']);
//   fetchScreenAndStoreInDb({
//     screenUrl: changedScreen['url'],
//     code_hash: remoteMessage['data']['code_hash'],
//   });
// }
// });
