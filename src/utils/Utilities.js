// var fs = require('fs');
export const replaceValuesInItemViewObjectsAsperDataGiven = (
  content,
  mapperRes,
) => {
  const modifiedContent = [];

  if (content != null && content.length > 0) {
    content.forEach(element => {
      if (element != null && element.name != null) {
        if (
          typeof mapperRes[element.name] === 'object' &&
          !Array.isArray(mapperRes[element.name]) &&
          mapperRes[element.name] !== null
        ) {
          element.value = mapperRes[element.name]['value'];
          element.props = mapperRes[element.name]['props'];
        } else {
          element.value = mapperRes[element.name];
        }
      }
      if (
        element != null &&
        element.content != null &&
        element.content.length > 0
      ) {
        const modifiedMiniContent =
          replaceValuesInItemViewObjectsAsperDataGiven(
            element.content,
            mapperRes,
          );
        element.content = modifiedMiniContent;
      }
      modifiedContent.push(element);
    });
  }
  return modifiedContent;
};

export const DATABASE_CONSTANTS = {
  CLIENT_ID: 'client_id',
  CLIENT_SECRET: 'client_secret',
  AUTH: 'auth',
};

export const isFunction = functionToCheck => {
  if (functionToCheck instanceof Function) {
    if (typeof functionToCheck === 'function') {
      if (
        Object.prototype.toString.call(functionToCheck) == '[object Function]'
      ) {
        return true;
      }
    }
  }
  return false;
};
