import {View} from 'react-native';
import CheckForListviewAndRender from './CheckForListviewAndRender';
import React from 'react';
interface RowElement {}
interface GetRowElementsProps {
  navigation: any;
  onPressCallBack: () => void;
  logicObject: any;
  propParameters: any;
  getUi: any;
  themes: any;
  unModifiedRowElementsArray: RowElement[];
  context: any;
  packages;
}
const GetRowElements = ({
  navigation,
  onPressCallBack,
  logicObject,
  propParameters,
  getUi,
  themes,
  unModifiedRowElementsArray,
  context,
  packages,
}: GetRowElementsProps): JSX.Element => {
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

  return <>{rowelements}</>;
};
interface RenderColoumViewsProps {
  navigation: any; // Adjust type as per your navigation object type
  logicObject: any; // Adjust type as per your logic object
  propParameters: any;
  onPressCallBack: () => void;
  getUi: any;
  themes: any;
  unModifiedTotalData: Record<string, any>; // Adjust type as per your data structure
  context: any;
  packages;
}

const RenderColoumViews = ({
  navigation,
  logicObject,
  propParameters,
  onPressCallBack,
  getUi,
  themes,
  unModifiedTotalData,
  context,
  packages,
}: RenderColoumViewsProps): JSX.Element => {
  const elements: JSX.Element[] = [];
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
              logicObject={logicObject}
              propParameters={propParameters}
              onPressCallBack={onPressCallBack}
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
            unModifiedRowElementsArray={
              unModifiedTotalData != null ? unModifiedTotalData[key] : null
            }
            key={key + index + 1}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            getUi={getUi}
            themes={themes}
            context={context}
            packages={packages}
          />,
        );
      }
    });
  }

  return <>{elements}</>;
};

export default RenderColoumViews;
