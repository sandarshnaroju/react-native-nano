import RNNano from './src/navigation/screen/Screens';
import NANO from './src/utils/Constants';
import Nano from './src/navigation/screen/GenericScreen';

import {fetchScreenAndStoreInDb} from './src/modules/nano-sync/NanoSync';
import {Platform} from 'react-native';
if (Platform.OS == 'android') {
  var messaging = require('@react-native-firebase/messaging');
}
export {RNNano, NANO, Nano};
if (Platform.OS == 'android') {
  messaging.default().setBackgroundMessageHandler(async remoteMessage => {
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
}
