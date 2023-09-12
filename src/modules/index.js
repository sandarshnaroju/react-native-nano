import getDatabase from './database/RealmDatabase';
import getNotification from './notifications/Notifications';

import getPermissionInstance from './permissions/Permissions';
import getSession from './session/Session';
import {Dimensions} from 'react-native';
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

const getModuleParams = ({callBack}) => {
  const database = getDatabase(callBack);
  const notifications = getNotification();
  const Permissions = getPermissionInstance();
  const session = getSession();

  const moduleParameters = {
    db: database,
    notifications,
    Permissions,
    session,
    deviceDimensions,
  };
  return moduleParameters;
  // return {};
};
export default getModuleParams;
