import {requestMultiple, request} from 'react-native-permissions';
class Permissions {
  constructor(props) {}
  requestPermissions(permissionsArray) {
    return requestMultiple(permissionsArray);
  }
  requestAPermission(permission) {
    return request(permission);
  }
  checkPermissionGrantStatus(permission) {
    return request(permission)
      .then(res => {
        if (res != null) {
          if (res === 'granted') {
            return new Promise.resolve(true);
          } else {
            return new Promise.resolve(false);
          }
        }
      })
      .catch(() => {
        return new Promise.resolve(false);
      });
  }
  checkIfPermissionsGranted(permissionsArray) {
    return requestMultiple(permissionsArray)
      .then(res => {
        if (res != null) {
          const checkIfNotGranted = permissionsArray.find(
            permission => res[permission] !== 'granted',
          );
          if (checkIfNotGranted != null) {
            return new Promise.resolve(false);
          } else {
            return new Promise.resolve(true);
          }
        }
      })
      .catch(() => {
        return new Promise.resolve(false);
      });
  }
}
var perm = null;
const getPermissionInstance = () => {
  try {
    if (perm == null) {
      require('react-native-permissions');

      perm = new Permissions();
    }
  } catch (e) {
    perm = null;
  }

  return perm;
};
export default getPermissionInstance;
