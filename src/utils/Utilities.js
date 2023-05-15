import {cloneDeep} from 'lodash';
import * as React from 'react';

import {Dimensions} from 'react-native';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

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
var dynamicValues = {
  'window.height': WINDOW_HEIGHT,
  'window.width': WINDOW_WIDTH,
  'screen.height': SCREEN_HEIGHT,
  'screen.width': SCREEN_WIDTH,
};
function evaluateMathExpression(expression) {
  // console.log('hahahaha', expression);

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
          // console.log('errror', expression);
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
  // let obj = cloneDeep(hObj);
  // let obj = propObj;
  if (typeof obj === 'object') {
    for (var key in obj) {
      if (key != null && key.indexOf('on') !== 0) {
        if (typeof obj[key] === 'string') {
          // console.log('helllo', obj[key]);
          const hreplaced = obj[key].replace(
            /{{([^}]+)}}/g,
            function (match, okey) {
              // Check if the dynamic value exists
              if (dynamicValues.hasOwnProperty(okey)) {
                // console.log('hello', key, obj[key]);

                return dynamicValues[okey] + '';
              }
              // If the dynamic value doesn't exist, return the original placeholder
              return match;
            },
          );

          obj[key] = hreplaced;

          var numericValue = parseFloat(evaluateMathExpression(hreplaced));
          if (key === 'height') {
            // console.log('replaced', hreplaced, typeof hreplaced, numericValue);
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
export const heightAndWidthFormatterForComponentObj = compObj => {
  // var dynamicValues = {
  //   'window.height': 200.0,
  //   'window.width': WINDOW_WIDTH,
  //   'screen.height': SCREEN_HEIGHT,
  //   'screen.width': SCREEN_WIDTH,
  // };
  // var stringsArray = [
  //   'window.height',
  //   'window.width',
  //   'screen.height',
  //   'screen.width',
  // ];
  // var regex = new RegExp(stringsArray.join('|'), 'g');

  replaceStringsWithNumbers(compObj);
  // if (compObj != null) {
  //   console.log('helllo', compObj['itemHeight'], compObj['component']);
  // }

  // function replace(key, value) {
  //   if (key == 'height') {
  //     console.log('cc', value);

  //     let change = parseFloat(
  //       value.replace(/{{([^}]+)}}/g, function (match, key) {
  //         // Check if the dynamic value exists
  //         if (dynamicValues.hasOwnProperty(key)) {
  //           console.log(
  //             'hello',
  //             dynamicValues[key],
  //             typeof dynamicValues[key],
  //             match,
  //             key,
  //           );
  //           return dynamicValues[key] + '';
  //         }
  //         // If the dynamic value doesn't exist, return the original placeholder
  //         return match;
  //       }),
  //     );
  //     return change;
  //   }
  //   return value;
  // }
  // const stringified = JSON.stringify(compObj, replace);
  // const mapObj = {
  //   '"{{window.height}}"': WINDOW_HEIGHT,
  //   '{{window.width}}': WINDOW_WIDTH,
  //   '{{screen.height}}': SCREEN_HEIGHT,
  //   '{{screen.width}}': SCREEN_WIDTH,
  // };

  // const hreplaced = stringified.replace(/{{([^}]+)}}/g, function (match, key) {
  //   // Check if the dynamic value exists
  //   if (dynamicValues.hasOwnProperty(key)) {
  //     console.log(
  //       'hello',
  //       dynamicValues[key],
  //       typeof dynamicValues[key],
  //       match,
  //       key,
  //     );

  //     return dynamicValues[key] + '';
  //   }
  //   // If the dynamic value doesn't exist, return the original placeholder
  //   return match;
  // });

  return compObj;
};
export const heightAndWidthFormatter = props => {
  if (props != null && typeof props == 'object') {
    Object.keys(props).forEach(ke => {
      // console.log('Ke', props[ke]);
      if (
        typeof props[ke] === 'object' &&
        !Array.isArray(props[ke]) &&
        props[ke] !== null
      ) {
        Object.keys(props[ke]).forEach(innerKe => {
          // console.log('hello', props[ke][innerKe].includes('@{height}'));
          if (
            props[ke][innerKe] != null &&
            JSON.stringify(props[ke][innerKe]).includes('{{')
          ) {
            // console.log(
            //   'exisits',
            //   JSON.stringify(props[ke][innerKe]).includes('@'),
            // );
            const newProp = {};

            const existing = props[ke][innerKe];
            // // props[ke][innerKe] = 100;
            const mapObj = {
              '{{window.height}}': WINDOW_HEIGHT,
              '{{window.width}}': WINDOW_WIDTH,
              '{{screen.height}}': SCREEN_HEIGHT,
              '{{screen.width}}': SCREEN_WIDTH,
            };
            // // if (existing != null && existing.includes('{{height}}')) {
            const hreplaced = existing.replace(
              /{{window.height}}|{{window.width}}|{{screen.height}}|{{screen.width}}/g,
              function (matched) {
                return mapObj[matched];
              },
            );
            // // }
            // // const wreplaced = existing.replace(/{{width}}/g, WINDOW_HEIGHT);
            const newNumber = eval(hreplaced);
            newProp[innerKe] = newNumber;

            // console.log(
            //   'hiii',
            //   newNumber,
            //   typeof newNumber,
            //   existing,
            //   typeof existing,
            //   // replaced,
            // );
            // props[ke]
            props[ke][innerKe] = newNumber;
          }
        });
      }
    });
  }
  return props;
};
