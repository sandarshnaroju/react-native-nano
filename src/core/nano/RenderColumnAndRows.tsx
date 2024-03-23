import {View} from 'react-native';
import CheckForListviewAndRender from './CheckForListviewAndRender';
import React from 'react';
interface RowElement {}
interface GetRowElementsProps {
  rowKey: string | number;
  navigation: any;
  onPressCallBack: () => void;
  onLongPressCallBack: () => void;
  logicObject: any;
  propParameters: any;
  route: any;
  customComponents: any;
  getUi: any;
  themes: any;
  unModifiedRowElementsArray: RowElement[];
  context: any;
}
const GetRowElements: React.FC<GetRowElementsProps> = ({
  navigation,
  onPressCallBack,
  logicObject,
  propParameters,
  route,
  customComponents,
  getUi,
  themes,
  unModifiedRowElementsArray,
  context,
}) => {
  const rowelements: JSX.Element[] = [];

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
interface RenderColoumViewsProps {
  navigation: any; // Adjust type as per your navigation object type
  logicObject: any; // Adjust type as per your logic object
  propParameters: any;
  onPressCallBack: () => void;
  onLongPressCallBack: () => void; // Adjust type as per your long press callback
  route: any; // Adjust type as per your route object
  customComponents: any;
  getUi: any;
  themes: any;
  unModifiedTotalData: Record<string, any>; // Adjust type as per your data structure
  context: any;
}

const RenderColoumViews: React.FC<RenderColoumViewsProps> = ({
  navigation,
  logicObject,
  propParameters,
  onPressCallBack,
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
              // rowKey={key}
              logicObject={logicObject}
              propParameters={propParameters}
              onPressCallBack={onPressCallBack}
              // onLongPressCallBack={onLongPressCallBack}
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
            // rowKey={key}
            unModifiedRowElementsArray={
              unModifiedTotalData != null ? unModifiedTotalData[key] : null
            }
            key={key + index + 1}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            // onLongPressCallBack={onLongPressCallBack}
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
