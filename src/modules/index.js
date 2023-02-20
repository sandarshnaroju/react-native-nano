import getDatabase from './database/RealmDatabase';
import getNotification from './notifications/Notifications';
import getPermissionInstance from './permissions/Permissions';
import getSession from './session/Session';

const getModuleParams = ({databaseConfigObject}) => {
  const database = getDatabase(databaseConfigObject);
  const notifications = getNotification();
  const Permissions = getPermissionInstance();
  const session = getSession();
  const moduleParameters = {
    db: database,
    notifications,
    Permissions,
    session,
  };
  return moduleParameters;
};
export default getModuleParams;
