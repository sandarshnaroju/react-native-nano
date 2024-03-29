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
  getUi: any;
  themes: any;
  unModifiedRowElementsArray: RowElement[];
  context: any;
  packages;
}
const GetRowElements: React.FC<GetRowElementsProps> = ({
  navigation,
  onPressCallBack,
  logicObject,
  propParameters,
  route,
  getUi,
  themes,
  unModifiedRowElementsArray,
  context,
  packages,
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
          logicObject={logicObject}
          onPressCallBack={onPressCallBack}
          getUi={getUi}
          themes={themes}
          context={context}
          packages={packages}
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
  route: any; // Adjust type as per your route object
  getUi: any;
  themes: any;
  unModifiedTotalData: Record<string, any>; // Adjust type as per your data structure
  context: any;
  packages;
}

const RenderColoumViews: React.FC<RenderColoumViewsProps> = ({
  navigation,
  logicObject,
  propParameters,
  onPressCallBack,
  route,
  getUi,
  themes,
  unModifiedTotalData,
  context,
  packages,
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
              route={route}
              getUi={getUi}
              themes={themes}
              context={context}
              packages={packages}
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
            route={route}
            getUi={getUi}
            themes={themes}
            context={context}
            packages={packages}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
