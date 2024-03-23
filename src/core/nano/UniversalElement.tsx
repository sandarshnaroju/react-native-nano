import * as Animatable from 'react-native-animatable';
import React from 'react';
import getElementAsPerComponent from './ElementByComponent';
interface ElementProps {
  customComponents: any;
  uniqueKey: string | number;
  propParameters: any;
  onPressCallBack: () => void;
  recyclerListViewFunctionProps: any;
  getUi: any;
  themes: any;
  // unModifiedElemOb: any;
  context: any;
  componentParams: any;
}
function UniversalElement({
  customComponents,
  uniqueKey,

  propParameters,
  onPressCallBack,
  recyclerListViewFunctionProps,

  getUi,
  themes,
  unModifiedElemOb,
  context,
  componentParams,
}: ElementProps) {
  const elemObjAfterThemesSet = unModifiedElemOb;

  const displayItem = getElementAsPerComponent({
    elemOb: elemObjAfterThemesSet,
    index: uniqueKey,

    customComponents,
    getUi,
    onPressCallBack,
    propParameters,
    recyclerListViewFunctionProps,
    uniqueKey,
    themes,
    context,
    componentParams,
  });

  if (
    elemObjAfterThemesSet != null &&
    elemObjAfterThemesSet['animation'] != null &&
    elemObjAfterThemesSet['animation']['simple']
  ) {
    return (
      <Animatable.View {...elemObjAfterThemesSet['animation']['simple']}>
        {displayItem}
      </Animatable.View>
    );
  }
  return displayItem;
}

export default UniversalElement;
