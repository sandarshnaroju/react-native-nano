import * as React from 'react';

import {Dimensions} from 'react-native';
import getElementAsPerComponent from '../elements/ElementByComponent';
import {requestDataFromUrlAsPerNetworkData} from '../modules/network/Network';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const functionDimensionsProps = {
  windowHeight: WINDOW_HEIGHT,
  windowWidth: WINDOW_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
};

export const nameShortcutObject = {};
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
export const modifyNestedValue = (obj, keys, newValue) => {
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (currentObj.hasOwnProperty(key)) {
      currentObj = currentObj[key];
    } else {
      // Key doesn't exist in the object
      return;
    }
  }

  const lastKey = keys[keys.length - 1];
  currentObj[lastKey] = newValue;
  // return currentObj;
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

          const newProps = mergeObjects(element, mapperRes[element.name]);
          element = newProps;
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
  NAME_AND_SCREEN_URL_OBJECT: 'nano_name_and_screen_url_object',
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
  onElementLoaded,
  elementProps,
  getViewItems,
}) => {
  if (
    compsArray != null &&
    Array.isArray(compsArray) &&
    compsArray.length > 0
  ) {
    const reqComp = compsArray.find(comp => comp['name'] === componentName);

    if (reqComp) {
      const Comp = reqComp['component'];

      if (Comp) {
        return (
          <Comp
            props={props}
            elementProps={elementProps}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
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
      let copy = new Function('return ' + func)();

      return copy(props);
    }
  }
};
var dynamicValues = {
  'window.height': WINDOW_HEIGHT,
  'window.width': WINDOW_WIDTH,
  'screen.height': SCREEN_HEIGHT,
  'screen.width': SCREEN_WIDTH,
};
function evaluateMathExpression(expression) {
  var operators = ['+', '-', '*', '/'];
  if (
    (expression != null && expression.includes('/')) ||
    expression.includes('+') ||
    expression.includes('-') ||
    expression.includes('*')
  ) {
    var parts = expression.split(
      new RegExp(`(${operators.map(operator => '\\' + operator).join('|')})`),
    );
    var numbers = [];

    // Parse numbers and operators
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();

      if (part.length === 0) {
        continue;
      }

      if (operators.includes(part)) {
        numbers.push(part);
      } else {
        var num = parseFloat(part);

        if (!isNaN(num)) {
          numbers.push(num);
        } else {
          //
          // throw new Error('Invalid expression');
        }
      }
    }

    // Perform calculations
    while (numbers.length > 1) {
      var operatorIndex = -1;

      // Find the first occurrence of *, /, +, or -
      for (var i = 0; i < numbers.length; i++) {
        if (operators.includes(numbers[i])) {
          operatorIndex = i;
          break;
        }
      }

      if (operatorIndex === -1) {
        throw new Error('Invalid expression');
      }

      // Extract the numbers and operator
      var operand1 = numbers[operatorIndex - 1];
      var operand2 = numbers[operatorIndex + 1];
      var operator = numbers[operatorIndex];

      // Perform the operation
      var result;
      switch (operator) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          result = operand1 / operand2;
          break;
        default:
          throw new Error('Invalid operator');
      }

      // Replace the operands and operator with the result
      numbers.splice(operatorIndex - 1, 3, result);
    }

    return numbers[0];
  } else {
    return expression;
  }
  // Split the expression based on operators
}

function replaceStringsWithNumbers(obj) {
  if (typeof obj === 'object') {
    for (var key in obj) {
      if (key != null && key.indexOf('on') !== 0) {
        if (typeof obj[key] === 'string') {
          const hreplaced = obj[key].replace(
            /{{([^}]+)}}/g,
            function (match, okey) {
              // Check if the dynamic value exists
              if (dynamicValues.hasOwnProperty(okey)) {
                //

                return dynamicValues[okey] + '';
              }
              // If the dynamic value doesn't exist, return the original placeholder
              return match;
            },
          );

          obj[key] = hreplaced;

          var numericValue = parseFloat(evaluateMathExpression(hreplaced));
          if (key === 'height') {
          }
          if (!isNaN(numericValue)) {
            obj[key] = numericValue;
          }
        } else if (typeof obj[key] === 'object') {
          replaceStringsWithNumbers(obj[key]); // Recursively handle nested objects
        }
      }
    }
  }
}
const functionKeysArray = [
  'fontSize',
  'height',
  'width',
  'zIndex',
  'lineHeight',
  'textShadowRadius',
  'elevation',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderRightWidth',
  'borderRadius',
  'borderWidth',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'letterSpacing',
  'right',
  'start',
  'top',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'itemHeight',
  'itemWidth',
];
function findAndSendPropsToImmediatlyInvokedFunctions(obj, props) {
  if (typeof obj === 'object') {
    for (var key in obj) {
      if (obj[key] != null) {
        if (typeof obj[key] === 'string' && functionKeysArray.includes(key)) {
          obj[key] = executeAFunction(obj[key], functionDimensionsProps);
        } else if (typeof obj[key] === 'object') {
          findAndSendPropsToImmediatlyInvokedFunctions(obj[key]); // Recursively handle nested objects
        }
      }
    }
  }
}
export const heightAndWidthFormatterForComponentObj = compObj => {
  return compObj;
};
export const heightAndWidthFormatter = props => {
  if (props != null && typeof props == 'object') {
    Object.keys(props).forEach(ke => {
      if (
        typeof props[ke] === 'object' &&
        !Array.isArray(props[ke]) &&
        props[ke] !== null
      ) {
        Object.keys(props[ke]).forEach(innerKe => {
          if (
            props[ke][innerKe] != null &&
            JSON.stringify(props[ke][innerKe]).includes('{{')
          ) {
            const newProp = {};

            const existing = props[ke][innerKe];
            const mapObj = {
              '{{window.height}}': WINDOW_HEIGHT,
              '{{window.width}}': WINDOW_WIDTH,
              '{{screen.height}}': SCREEN_HEIGHT,
              '{{screen.width}}': SCREEN_WIDTH,
            };
            const hreplaced = existing.replace(
              /{{window.height}}|{{window.width}}|{{screen.height}}|{{screen.width}}/g,
              function (matched) {
                return mapObj[matched];
              },
            );

            const newNumber = eval(hreplaced);
            newProp[innerKe] = newNumber;

            props[ke][innerKe] = newNumber;
          }
        });
      }
    });
  }
  return props;
};

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Universal Element Functions ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

export const fetchDataBasedOnNetworkObject = ({
  elementObject,
  propParameters,
  onPressCallBack,
  getUi,
}) => {
  if (elementObject != null && elementObject['network'] != null) {
    if (elementObject['network']['action'] === 'onStart') {
      requestDataFromUrlAsPerNetworkData({
        requestType: elementObject['network']['use'],
        requestObj: elementObject['network'],
        props: {
          moduleParams: propParameters,

          setUi: onPressCallBack,
          getUi: getUi,
        },
      });
    }
  }
};

export const onElementLoaded = ({
  loadedElemObject,
  getUi,
  onPressCallBack,
  propParameters,
}) => {
  fetchDataBasedOnNetworkObject({
    elementObject: loadedElemObject,
    getUi,
    onPressCallBack,
    propParameters,
  });
};

const withExtraParams = (originalFn, extraParams, onPressCallBack) => {
  return function (args) {
    const newArgs = {
      methodValues: args,
      ...extraParams,
    };

    executeAFunction(originalFn, newArgs);
  };
};

const dummy = (props, elemObj) => {
  requestDataFromUrlAsPerNetworkData({
    requestType: elemObj['network']['use'],
    requestObj: elemObj['network'],
    props,
  });
};
const onPressNetwork = (onPressFunc, props, eleObject) => {
  executeAFunction(onPressFunc, props);
  return dummy(props, eleObject);
};
export const getInterceptedFunctionProps = ({
  eleObject,
  props,
  onPressCallBack,
}) => {
  const funArray = {};

  const functionWithOnKeys = Object.keys(eleObject).filter(
    propKey => propKey.indexOf('on') === 0,
  );

  if (
    eleObject != null &&
    eleObject['network'] != null &&
    eleObject['network']['action'] === 'onPress'
  ) {
    functionWithOnKeys.push('onPress');
  }

  functionWithOnKeys.forEach(propKey => {
    let func = null;
    if (
      props != null &&
      props['logicObject'] != null &&
      props['logicObject'][eleObject[propKey]] != null
    ) {
      func = props['logicObject'][eleObject[propKey]];
    } else {
      func = eleObject[propKey];
    }

    if (
      eleObject != null &&
      eleObject['network'] != null &&
      eleObject['network']['action'] === 'onPress'
    ) {
      funArray[propKey] = withExtraParams(() => {
        onPressNetwork(func, props, eleObject);
      }, props);
      // funArray[propKey] = withExtraParams(eleObject[propKey], props);
    } else {
      funArray[propKey] = withExtraParams(func, props);
    }
  });

  return funArray;
};
export const getViewItems = ({
  content,

  uniqueKey,
  customComponents,
  onPressCallBack,
  propParameters,
  getUi,
  recyclerListViewFunctionProps,
  themes,
  componentParams,
}) => {
  const elements = [];
  if (content != null && content.length > 0) {
    content.forEach((elemet, index) => {
      const oitem = getElementAsPerComponent({
        customComponents,
        elemOb: elemet,
        index: index + uniqueKey,
        componentParams,
        onPressCallBack,
        propParameters,
        getUi,
        recyclerListViewFunctionProps: null,

        themes,
        uniqueKey,
      });

      elements.push(oitem);
    });
  }

  return elements;
};

export const modifyElemObjAsPerTheme = (compObj, themes, contextObj) => {
  if (typeof compObj === 'object' && contextObj) {
    for (var key in compObj) {
      if (compObj[key] != null) {
        if (
          typeof compObj[key] === 'string' &&
          (key.includes('color') || key.includes('Color'))
        ) {
          const userGivenColorString = compObj[key];

          const selectedThemObj = themes.find(themeObj => {
            if (contextObj.theme) {
              return themeObj['name'] == contextObj.theme;
            }

            return themeObj['isDark'] == contextObj.isDark;
          });

          if (
            selectedThemObj != null &&
            selectedThemObj['colors'] != null &&
            selectedThemObj['colors'][userGivenColorString] != null
          ) {
            compObj[key] = selectedThemObj['colors'][userGivenColorString];
          }
        } else if (typeof compObj[key] === 'object') {
          modifyElemObjAsPerTheme(compObj[key], themes, contextObj); // Recursively handle nested objects
        }
      }
    }
  }
  return compObj;
};
