var nameShortcutObject = {};

export const getNameSHortcutObject = () => {
  return nameShortcutObject;
};
export const traverseThroughInputJsonAndCreateNameShortcut = (
  jsonData: any,
  keys: (string | number)[] = [],
): void => {
  if (typeof jsonData === 'object' && jsonData !== null) {
    if (Array.isArray(jsonData)) {
      jsonData.forEach((item, index) => {
        traverseThroughInputJsonAndCreateNameShortcut(item, keys.concat(index));
      });
    } else {
      for (const key in jsonData) {
        if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
          const value = jsonData[key];
          if (typeof value === 'object' && value !== null) {
            traverseThroughInputJsonAndCreateNameShortcut(
              value,
              keys.concat(key),
            );
          } else {
            if (key === 'name') {
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
export const getElementObjectByKey = (
  uiElements: any,
  nameKey: string,
): any => {
  if (Object.keys(nameShortcutObject).length === 0) {
    traverseThroughInputJsonAndCreateNameShortcut(uiElements, []);
  }
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
};
