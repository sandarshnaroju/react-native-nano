// var fs = require('fs');

import * as React from 'react';

const mergeObjects = (firstObj, secondObj) => {
  for (var p in secondObj) {
    if (typeof firstObj[p] == 'object') {
      firstObj[p] = mergeObjects(firstObj[p], secondObj[p]);
    } else {
      firstObj[p] = secondObj[p];
    }
  }
  return firstObj;
};

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
          // const newProps = {
          //   ...element.props,
          //   ...mapperRes[element.name]['props'],
          // };
          const newProps = mergeObjects(
            element.props,
            mapperRes[element.name]['props'],
          );
          element.props = newProps;
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

export const executeAFunction = (func, props) => {
  const isItFunction = isFunction(func);
  if (typeof mapper !== 'string' && isItFunction) {
    return func(props);
  } else {
    if (func != null && typeof func === 'string') {
      // console.log('runnning function');

      let copy = new Function('return ' + func)();

      return copy(props);
    }
  }
};
