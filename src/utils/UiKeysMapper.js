import getSession from '../modules/session/Session';

var nameShortcutObject = {};

export const getNameSHortcutObject = () => {
  return nameShortcutObject;
};

export const getElementObjectByKey = (uiElements, nameKey) => {
  if (nameShortcutObject != null && nameShortcutObject !== {}) {
    const pathsArray = nameShortcutObject[nameKey];
    // console.log('nameshortcut object', pathsArray, uiElements);

    let temp = uiElements;
    if (pathsArray != null && pathsArray.length > 0) {
      for (let index = 0; index < pathsArray.length; index++) {
        temp = temp[pathsArray[index]];
      }
      return temp;
    }

    // return null;
  }
};

export const traverseThroughInputJsonAndCreateNameSHortcut = (
  jsonData,
  keys = [],
) => {
  if (typeof jsonData === 'object' && jsonData !== null) {
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
          if (typeof value === 'object' && value !== null) {
            traverseThroughInputJsonAndCreateNameSHortcut(
              value,
              keys.concat(key),
              nameShortcutObject,
            );
          } else {
            if (key === 'name') {
              // console.log('valll', key, result, keys, value);

              if (!nameShortcutObject[value]) {
                nameShortcutObject[value] = [];
              }

              // nameShortcutObject[value] = keys.concat(key);
              // console.log(
              //   '🚀 ~ file: UiKeysMapper.js:58 ~ keys:',
              //   key,
              //   keys,
              //   nameShortcutObject,
              //   value,
              // );

              nameShortcutObject[value] = keys;
            } else {
              // if (
              //   key != null &&
              //   (key.includes('Color') || key.includes('color'))
              // ) {
              //   if (jsonData[key] != null && jsonData[key].includes('|')) {
              //     const session = getSession();
              //     const givenValue = jsonData[key];
              //     const theme = session.getValue('theme');
              //     const updatedColor =
              //       givenValue.split(' | ')[theme === 'dark' ? 1 : 0];
              //     jsonData[key] = updatedColor;
              //     console.log('hello', givenValue, theme, updatedColor);
              //   }
              // }
            }
            // return jsonData;
          }
        }
      }
    }
  }
};
