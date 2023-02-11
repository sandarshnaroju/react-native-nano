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

export const getPermissionInstance = () => {
  const perm = new Permissions();
  return perm;
};
