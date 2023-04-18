import {View} from 'react-native';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import {isFunction} from '../utils/Utilities';
import React from 'react';
const onElementPress = (
  eleObject,
  index,
  itemData,
  listData,
  logicObject,
  propParameters,
  itemJson,
  onPressCallBack,
) => {
  if (logicObject == null) {
    if (eleObject != null && eleObject['onClick'] != null) {
      const isItFunction = isFunction(eleObject['onClick']);
      if (typeof eleObject['onClick'] !== 'string' && isItFunction) {
        return eleObject['onClick']({
          index,
          itemData,
          listData,
          itemJson,
          setUi: onPressCallBack,

          ...propParameters,
        });
      } else {
        if (
          eleObject != null &&
          eleObject['onClick'] != null &&
          typeof eleObject['onClick'] === 'string'
        ) {
          // console.log('runnning function');

          let copy = new Function('return ' + eleObject['onClick'])();

          return copy({
            index,
            itemData,
            listData,
            itemJson,
            setUi: onPressCallBack,

            ...propParameters,
          });
        }
      }
    }
  } else {
    if (eleObject != null && eleObject['onClick'] != null) {
      const isItFunction = isFunction(eleObject['onClick']);

      if (isItFunction) {
        return eleObject['onClick']({
          index,
          itemData,
          listData,
          itemJson,
          setUi: onPressCallBack,

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
                itemData,
                listData,
                itemJson,
                setUi: onPressCallBack,

                ...propParameters,
              });
            }
            if (typeof logicObject[eleObject['onClick']] === 'function') {
              return logicObject[eleObject['onClick']]({
                index,
                itemData,
                listData,
                itemJson,
                setUi: onPressCallBack,

                ...propParameters,
              });
            }
          } else {
            let copy = new Function('return ' + eleObject['onClick'])();

            return copy({
              index,
              itemData,
              listData,
              itemJson,
              setUi: onPressCallBack,

              ...propParameters,
            });
          }
        }
      }
    }
  }
};
const onElementLongPress = (
  eleObject,
  index,
  itemData,
  listData,
  logicObject,
  propParameters,
  itemJson,
  onPressCallBack,
) => {
  if (logicObject == null) {
    if (eleObject != null && eleObject['onLongClick'] != null) {
      const isItFunction = isFunction(eleObject['onLongClick']);
      if (typeof eleObject['onLongClick'] !== 'string' && isItFunction) {
        return eleObject['onLongClick']({
          index,
          itemData,
          listData,
          itemJson,
          setUi: onPressCallBack,

          ...propParameters,
        });
      } else {
        if (
          eleObject != null &&
          eleObject['onLongClick'] != null &&
          typeof eleObject['onLongClick'] === 'string'
        ) {
          let copy = new Function('return ' + eleObject['onLongClick'])();

          return copy({
            index,
            itemData,
            listData,
            itemJson,
            setUi: onPressCallBack,

            ...propParameters,
          });
        }
      }
    }
  } else {
    if (eleObject != null && eleObject['onLongClick'] != null) {
      const isItFunction = isFunction(eleObject['onLongClick']);

      if (isItFunction) {
        return eleObject['onLongClick']({
          index,
          itemData,
          listData,
          itemJson,
          setUi: onPressCallBack,

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
                itemData,
                listData,
                itemJson,
                setUi: onPressCallBack,

                ...propParameters,
              });
            }
            if (typeof logicObject[eleObject['onLongClick']] === 'object') {
              return logicObject[eleObject['onLongClick']]({
                index,
                itemData,
                listData,
                itemJson,
                setUi: onPressCallBack,

                ...propParameters,
              });
            }
          } else {
            let copy = new Function('return ' + eleObject['onLongClick'])();

            return copy({
              index,
              itemData,
              listData,
              itemJson,
              setUi: onPressCallBack,

              ...propParameters,
            });
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
  const onCalll = e => {
    // console.log('Render modifiedElements', e['v1'][0]['listData'].length);
    onPressCallBack(e);
  };
  const rowelements = [];
  if (
    rowElementsArray != null &&
    typeof rowElementsArray == 'object' &&
    rowElementsArray.length > 0
  ) {
    rowElementsArray.forEach((eleObject, index) => {
      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          elemOb={eleObject}
          navigation={navigation}
          route={route}
          propParameters={propParameters}
          customComponents={customComponents}
          // funProps={funProps}
          logicObject={logicObject}
          onPressCallBack={onCalll}
          onPress={({index, itemData, listData, itemJson}) => {
            onElementPress(
              eleObject,
              index,
              itemData,
              listData,
              logicObject,
              propParameters,
              itemJson,
              onPressCallBack,
            );
          }}
          onLongPress={(index, itemData, listData, itemJson) => {
            onElementLongPress(
              eleObject,
              index,
              itemData,
              listData,
              logicObject,
              propParameters,
              itemJson,
              onPressCallBack,
            );
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
