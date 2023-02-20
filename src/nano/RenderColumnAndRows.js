import React from 'react';
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
  if (
    logicObject != null &&
    eleObject != null &&
    eleObject['onClick'] != null
  ) {
    const isItFunction = isFunction(eleObject['onClick']);

    if (typeof eleObject['onClick'] !== 'string' && isItFunction) {
      return eleObject['onClick']({
        index,
        item,
        completeFlatlistData,
        ...propParameters,
      });
    } else {
      return logicObject[eleObject['onClick']]({
        index,
        item,
        completeFlatlistData,
        ...propParameters,
      });
    }
  }
};

const GetRowElements = ({
  rowElementsArray,
  rowKey,
  navigation,
  onPressCallBack,
  logicObject,
  propParameters,
  databaseConfigObject,
  route,
}) => {
  const rowelements = [];
  if (rowElementsArray != null && rowElementsArray.length > 0) {
    rowElementsArray.forEach((eleObject, index) => {
      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          elemOb={eleObject}
          navigation={navigation}
          route={route}
          databaseConfigObject={databaseConfigObject}
          propParameters={propParameters}
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
  route,
  databaseConfigObject,
}) => {
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
              route={route}
              databaseConfigObject={databaseConfigObject}
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
            route={route}
            databaseConfigObject={databaseConfigObject}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
