import {
  check,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
class Permissions {
  constructor(props) {}
  requestPermissions(permissionsArray) {
    requestMultiple(permissionsArray)
      .then(res => {
        if (res != null) {
          const checkIfNotGranted = permissionsArray.find(
            permission => res[permission] !== 'granted',
          );
          if (checkIfNotGranted != null) {
            return false;
          } else {
            return true;
          }
        }
      })
      .catch(() => {
        return false;
      });
  }
}
let perm = null;
export const getPermissionInstance = () => {
  if (perm == null) {
    perm = new Permissions();
  }
  return perm;
};
