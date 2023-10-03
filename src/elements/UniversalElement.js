import * as Animatable from 'react-native-animatable';
import React from 'react';
import getElementAsPerComponent from './ElementByComponent';

function UniversalElement({
  elemObj,

  customComponents,
  uniqueKey,

  propParameters,
  onPressCallBack,
  recyclerListViewFunctionProps,

  getUi,
  themes,
  unModifiedElemOb,
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
  });

  if (elemObjAfterThemesSet != null && elemObjAfterThemesSet['animation']) {
    return (
      <Animatable.View {...elemObjAfterThemesSet['animation']}>
        {displayItem}
      </Animatable.View>
    );
  }
  return displayItem;
}

export default UniversalElement;
