// var fs = require('fs');
import * as React from 'react';
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
  AUTH: 'auth',
  EXPIRY_TIME_STAMP: 'expiry_time',
  PUBLIC_KEY: 'PUBLIC_KEY',
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

export const checkNameAndRenderCustomComponent = ({
  compsArray,
  componentName,
  props,
}) => {
  // console.log('namee utilities', compsArray, componentName);

  if (compsArray) {
    const reqComp = compsArray.find(comp => comp['name'] === componentName);

    if (reqComp) {
      const Comp = reqComp['component'];
      // console.log('custome comp', Comp);

      if (Comp) {
        return <Comp props={props} />;
      }
    }
  } else {
    return null;
  }
};
