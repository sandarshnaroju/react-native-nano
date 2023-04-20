import messaging, {firebase} from '@react-native-firebase/messaging';

var foreGround = null;
class Firebase {
  constructor(props) {}

  getBackgroundHandler(callBack) {
    messaging().setBackgroundMessageHandler(callBack);
  }
  getOnMessage(callBack) {
    foreGround = messaging().onMessage(callBack);
  }
  getToken() {
    const defaultAppMessaging = firebase.messaging();

    return defaultAppMessaging
      .getToken()
      .then(token => {
        return token;
      })
      .catch(e => {
        console.log('error', e);
      });
  }
  unSubscribeOnMessage() {
    return foreGround;
  }
}
var notif = null;
const getFirebase = () => {
  try {
    if (notif == null) {
      require('@react-native-firebase/messaging');

      notif = new Firebase();
    }
  } catch (e) {
    notif = null;
  }

  return notif;
};
export default getFirebase;
