import * as Animatable from 'react-native-animatable';
import React from 'react';
import getElementAsPerComponent from './ElementByComponent';

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
}) {
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
