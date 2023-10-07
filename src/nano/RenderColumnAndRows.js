import {View} from 'react-native';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import {isFunction} from '../utils/Utilities';
import React from 'react';

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
  getUi,
  themes,
  unModifiedRowElementsArray,
}) => {
  const rowelements = [];

  if (
    rowElementsArray != null &&
    typeof rowElementsArray == 'object' &&
    rowElementsArray.length > 0
  ) {
    rowElementsArray.forEach((eleObject, index) => {
      if (Object.keys(propParameters).length < 3) {
        // console.log('elele', eleObject['component']);
      }

      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          index={index}
          elemOb={eleObject}
          unModifiedElemOb={
            unModifiedRowElementsArray != null
              ? unModifiedRowElementsArray[index]
              : null
          }
          navigation={navigation}
          route={route}
          propParameters={propParameters}
          customComponents={customComponents}
          // funProps={funProps}
          logicObject={logicObject}
          onPressCallBack={onPressCallBack}
          getUi={getUi}
          themes={themes}
        />,
      );
    });
  }
  // console.log('rowshortcut ', nameShortcutObject);

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
  getUi,
  themes,
  unModifiedTotalData,
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
              unModifiedRowElementsArray={
                unModifiedTotalData != null ? unModifiedTotalData[key] : null
              }
              rowKey={key}
              logicObject={logicObject}
              propParameters={propParameters}
              onPressCallBack={onPressCallBack}
              onLongPressCallBack={onLongPressCallBack}
              customComponents={customComponents}
              route={route}
              getUi={getUi}
              themes={themes}
            />
          </View>,
        );
      } else if (key != null && key.slice(0, 1) === 'v') {
        elements.push(
          <GetRowElements
            navigation={navigation}
            rowElementsArray={totalData[key]}
            rowKey={key}
            unModifiedRowElementsArray={
              unModifiedTotalData != null ? unModifiedTotalData[key] : null
            }
            key={key + index + 1}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            onLongPressCallBack={onLongPressCallBack}
            customComponents={customComponents}
            route={route}
            getUi={getUi}
            themes={themes}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
