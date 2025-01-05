import {AxiosStatic} from 'axios';
import Axios from './axios/Axios';
import getDatabase from './database/RealmDatabase';
import getNotification from './notifications/Notifications';

import getPermissionInstance from './permissions/Permissions';
import getSession from './session/Session';
import {
  Dimensions,
  Alert,
  Linking,
  Share,
  Keyboard,
  Appearance,
  AppState,
  InteractionManager,
  PanResponder,
  Platform,
  PixelRatio,
  BackHandler,
  LayoutAnimation,
  UIManager,
  Animated,
  Easing,
  Systrace,
  Vibration,
  Settings,
  AccessibilityInfo,
} from 'react-native';
// import ImagePicker from './imagepicker/ImagePicker';
// import DeviceInfo from './deviceinfo/DeviceInfo';
import Toast from 'react-native-toast-message';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const deviceDimensions = {
  windowHeight: WINDOW_HEIGHT,
  windowWidth: WINDOW_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
};
interface ModuleParameters {
  database: any;
  notifications: any;
  permissions: any;
  session: any;
  dimensions: typeof deviceDimensions;
  // deviceInfo: any;
  alert: typeof Alert;
  linking: typeof Linking;
  share: typeof Share;
  keyboard: typeof Keyboard;
  appearance: typeof Appearance;
  appState: typeof AppState;
  interactionManager: typeof InteractionManager;
  panResponder: typeof PanResponder;
  platform: typeof Platform;
  pixelRatio: typeof PixelRatio;
  backHandler: typeof BackHandler;
  layoutAnimation: typeof LayoutAnimation;
  uiManager: typeof UIManager;
  animated: typeof Animated;
  easing: typeof Easing;
  systrace: typeof Systrace;
  vibration: typeof Vibration;
  settings: typeof Settings;
  accessibilityInfo: typeof AccessibilityInfo;
  toast: any;
  imagePicker?: any;
  axios: AxiosStatic;
}

const getModuleParams = ({
  callBack,
  database,
}: {
  callBack: any;
  database: object;
}): ModuleParameters => {
  const databaseInstance = getDatabase(database, callBack);
  databaseInstance.init();
  const notifications = getNotification();
  const permissions = getPermissionInstance();
  const session = getSession();

  const moduleParameters = {
    database: databaseInstance,
    notifications,
    permissions,
    session,
    dimensions: deviceDimensions,
    // deviceInfo: DeviceInfo,
    alert: Alert,
    linking: Linking,
    share: Share,
    keyboard: Keyboard,
    appearance: Appearance,
    appState: AppState,
    interactionManager: InteractionManager,
    panResponder: PanResponder,
    platform: Platform,
    pixelRatio: PixelRatio,
    backHandler: BackHandler,
    layoutAnimation: LayoutAnimation,
    uiManager: UIManager,
    animated: Animated,
    easing: Easing,
    systrace: Systrace,
    vibration: Vibration,
    settings: Settings,
    accessibilityInfo: AccessibilityInfo,
    toast: Toast,
    axios: Axios,
  };
  // if (ImagePicker) {
  //   moduleParameters['imagePicker'] = ImagePicker;
  // }
  return moduleParameters;
};
export default getModuleParams;
