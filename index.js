import RNNano from './src/navigation/screen/Screens';
import NANO from './src/utils/Constants';
import Nano from './src/navigation/screen/GenericScreen';
import messaging from '@react-native-firebase/messaging';
import {fetchScreenAndStoreInDb} from './src/modules/nano-sync/NanoSync';

export {RNNano, NANO, Nano};
messaging().setBackgroundMessageHandler(async remoteMessage => {
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
});
