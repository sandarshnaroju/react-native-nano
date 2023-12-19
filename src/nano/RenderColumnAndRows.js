import {View} from 'react-native';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import React from 'react';

const GetRowElements = ({
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
  context,
}) => {
  const rowelements = [];

  if (
    unModifiedRowElementsArray != null &&
    typeof unModifiedRowElementsArray == 'object' &&
    unModifiedRowElementsArray.length > 0
  ) {
    unModifiedRowElementsArray.forEach((eleObject, index) => {
      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          index={index}
          unModifiedElemOb={eleObject}
          navigation={navigation}
          route={route}
          propParameters={propParameters}
          customComponents={customComponents}
          logicObject={logicObject}
          onPressCallBack={onPressCallBack}
          getUi={getUi}
          themes={themes}
          context={context}
        />,
      );
    });
  }

  return rowelements;
};

const RenderColoumViews = ({
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
  context,
}) => {
  const elements = [];
  if (unModifiedTotalData != null) {
    Object.keys(unModifiedTotalData).forEach((key, index) => {
      if (key != null && key.slice(0, 1) == 'h') {
        elements.push(
          <View
            style={{
              flexDirection: 'row',
            }}
            key={key + index + 1}>
            <GetRowElements
              navigation={navigation}
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
              context={context}
            />
          </View>,
        );
      } else if (key != null && key.slice(0, 1) == 'v') {
        elements.push(
          <GetRowElements
            navigation={navigation}
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
            context={context}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
