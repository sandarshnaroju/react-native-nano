import React, {useRef} from 'react';
import {View} from 'react-native';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import {isFunction} from '../utils/Utilities';
const onElementPress = (
  eleObject,
  index,
  item,
  completeFlatlistData,
  logicObject,
  propParameters,
) => {
  if (logicObject == null) {
    if (eleObject != null && eleObject['onClick'] != null) {
      const isItFunction = isFunction(eleObject['onClick']);
      if (typeof eleObject['onClick'] !== 'string' && isItFunction) {
        return eleObject['onClick']({
          index,
          item,
          completeFlatlistData,
          ...propParameters,
        });
      } else {
        if (
          eleObject != null &&
          eleObject['onClick'] != null &&
          typeof eleObject['onClick'] === 'string'
        ) {
          let copy = new Function('return ' + eleObject['onClick'])();

          return copy({index, item, completeFlatlistData, ...propParameters});
        }
      }
    }
  } else {
    if (eleObject != null && eleObject['onClick'] != null) {
      const isItFunction = isFunction(eleObject['onClick']);

      if (isItFunction) {
        return eleObject['onClick']({
          index,
          item,
          completeFlatlistData,
          ...propParameters,
        });
      } else {
        if (typeof eleObject['onClick'] === 'string') {
          if (logicObject[eleObject['onClick']] != null) {
            if (typeof logicObject[eleObject['onClick']] === 'string') {
              let copy = new Function(
                'return ' + logicObject[eleObject['onClick']],
              )();

              return copy({
                index,
                item,
                completeFlatlistData,
                ...propParameters,
              });
            }
            if (typeof logicObject[eleObject['onClick']] === 'object') {
              return logicObject[eleObject['onClick']]({
                index,
                item,
                completeFlatlistData,
                ...propParameters,
              });
            }
          } else {
            let copy = new Function('return ' + eleObject['onClick'])();

            return copy({index, item, completeFlatlistData, ...propParameters});
          }
        }
      }
    }
  }
};
const onElementLongPress = (
  eleObject,
  index,
  item,
  completeFlatlistData,
  logicObject,
  propParameters,
) => {
  if (logicObject == null) {
    if (eleObject != null && eleObject['onLongClick'] != null) {
      const isItFunction = isFunction(eleObject['onLongClick']);
      if (typeof eleObject['onLongClick'] !== 'string' && isItFunction) {
        return eleObject['onLongClick']({
          index,
          item,
          completeFlatlistData,
          ...propParameters,
        });
      } else {
        if (
          eleObject != null &&
          eleObject['onLongClick'] != null &&
          typeof eleObject['onLongClick'] === 'string'
        ) {
          let copy = new Function('return ' + eleObject['onLongClick'])();

          return copy({index, item, completeFlatlistData, ...propParameters});
        }
      }
    }
  } else {
    if (eleObject != null && eleObject['onLongClick'] != null) {
      const isItFunction = isFunction(eleObject['onLongClick']);

      if (isItFunction) {
        return eleObject['onLongClick']({
          index,
          item,
          completeFlatlistData,
          ...propParameters,
        });
      } else {
        if (typeof eleObject['onLongClick'] === 'string') {
          if (logicObject[eleObject['onLongClick']] != null) {
            if (typeof logicObject[eleObject['onLongClick']] === 'string') {
              let copy = new Function(
                'return ' + logicObject[eleObject['onLongClick']],
              )();

              return copy({
                index,
                item,
                completeFlatlistData,
                ...propParameters,
              });
            }
            if (typeof logicObject[eleObject['onLongClick']] === 'object') {
              return logicObject[eleObject['onLongClick']]({
                index,
                item,
                completeFlatlistData,
                ...propParameters,
              });
            }
          } else {
            let copy = new Function('return ' + eleObject['onLongClick'])();

            return copy({index, item, completeFlatlistData, ...propParameters});
          }
        }
      }
    }
  }
};
const GetRowElements = ({
  rowElementsArray,
  rowKey,
  navigation,
  onPressCallBack,
  onLongPressCallBack,
  logicObject,
  propParameters,
  route,
  customComponents,
}) => {
  // console.log('GetRowElements', customComponents);

  const rowelements = [];
  if (rowElementsArray != null && rowElementsArray.length > 0) {
    rowElementsArray.forEach((eleObject, index) => {
      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          elemOb={eleObject}
          navigation={navigation}
          route={route}
          propParameters={propParameters}
          customComponents={customComponents}
          onPress={(index, item, completeFlatlistData) => {
            const res = onElementPress(
              eleObject,
              index,
              item,
              completeFlatlistData,
              logicObject,
              propParameters,
            );

            onPressCallBack(res);
            // onElementPress(eleObject, index, item, completeFlatlistData);
          }}
          onLongPress={(index, item, completeFlatlistData) => {
            const res = onElementLongPress(
              eleObject,
              index,
              item,
              completeFlatlistData,
              logicObject,
              propParameters,
            );

            onLongPressCallBack(res);
            // onElementPress(eleObject, index, item, completeFlatlistData);
          }}
        />,
      );
    });
  }
  return rowelements;
};
const RenderColoumViews = ({
  totalData,
  navigation,
  logicObject,
  propParameters,
  onPressCallBack,
  onLongPressCallBack,
  route,
  customComponents,
}) => {
  // console.log('RenderColoumViews', customCompRef.current);

  const elements = [];
  if (totalData != null) {
    Object.keys(totalData).forEach((key, index) => {
      if (key != null && key.slice(0, 1) === 'h') {
        elements.push(
          <View
            style={{
              flexDirection: 'row',
            }}
            key={key + index + 1}>
            <GetRowElements
              navigation={navigation}
              rowElementsArray={totalData[key]}
              rowKey={key}
              logicObject={logicObject}
              propParameters={propParameters}
              onPressCallBack={onPressCallBack}
              onLongPressCallBack={onLongPressCallBack}
              customComponents={customComponents}
              route={route}
            />
          </View>,
        );
      } else if (key != null && key.slice(0, 1) === 'v') {
        elements.push(
          <GetRowElements
            navigation={navigation}
            rowElementsArray={totalData[key]}
            rowKey={key}
            key={key + index + 1}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            onLongPressCallBack={onLongPressCallBack}
            customComponents={customComponents}
            route={route}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
