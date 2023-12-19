import getSession from '../modules/session/Session';

var nameShortcutObject = {};

export const getNameSHortcutObject = () => {
  return nameShortcutObject;
};

export const getElementObjectByKey = (uiElements, nameKey) => {
  if (nameShortcutObject != null && nameShortcutObject !== {}) {
    const pathsArray = nameShortcutObject[nameKey];

    let temp = uiElements;

    if (pathsArray != null && pathsArray.length > 0) {
      if (pathsArray.includes('screen')) {
        pathsArray.splice(0, pathsArray.indexOf('screen') + 1);
      }

      for (let index = 0; index < pathsArray.length; index++) {
        if (temp != null && pathsArray[index] != null) {
          temp = temp[pathsArray[index]];
        }
      }
      return temp;
    }
  }
};

export const traverseThroughInputJsonAndCreateNameSHortcut = (
  jsonData,
  keys = [],
) => {
  if (typeof jsonData == 'object' && jsonData !== null) {
    if (Array.isArray(jsonData)) {
      jsonData.forEach((item, index) => {
        traverseThroughInputJsonAndCreateNameSHortcut(
          item,
          keys.concat(index),
          nameShortcutObject,
        );
      });
    } else {
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          const value = jsonData[key];
          if (typeof value == 'object' && value !== null) {
            traverseThroughInputJsonAndCreateNameSHortcut(
              value,
              keys.concat(key),
              nameShortcutObject,
            );
          } else {
            if (key == 'name') {
              if (!nameShortcutObject[value]) {
                nameShortcutObject[value] = [];
              }

              nameShortcutObject[value] = keys;
            }
          }
        }
      }
    }
  }
};
