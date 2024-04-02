import * as Animatable from 'react-native-animatable';
import React from 'react';
import getElementAsPerComponent from './ElementByComponent';
interface ElementProps {
  uniqueKey: number;
  propParameters: any;
  onPressCallBack: () => void;
  recyclerListViewFunctionProps?: any;
  getUi: any;
  themes: any;
  unModifiedElemOb: any;
  context: any;
  componentParams?: any;
  packages;
}
function UniversalElement({
  uniqueKey,

  propParameters,
  onPressCallBack,
  recyclerListViewFunctionProps,
  packages,

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

    getUi,
    onPressCallBack,
    propParameters,
    recyclerListViewFunctionProps,
    uniqueKey,
    themes,
    context,
    componentParams,
    packages,
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
