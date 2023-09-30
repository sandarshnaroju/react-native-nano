import * as Animatable from 'react-native-animatable';
import React, {useEffect, useRef, useState} from 'react';
import getElementAsPerComponent from './ElementByComponent';
import {GetContextProvider} from '../context/DataContext';
import {modifyElemObjAsPerTheme} from '../utils/Utilities';
import {cloneDeep} from 'lodash';
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
  const context = GetContextProvider();
  const elemObjRef = useRef(unModifiedElemOb);

  const originalObj = cloneDeep(elemObjRef.current);
  let elemObjAfterThemesSet = originalObj;
  if (themes != null && themes.length > 0) {
    elemObjAfterThemesSet = modifyElemObjAsPerTheme(
      originalObj,
      themes,
      context,
    );
  }

  const displayItem = getElementAsPerComponent({
    elemOb: elemObjAfterThemesSet,
    index: uniqueKey,

    customComponents,
    getUi,
    onPressCallBack,
    propParameters: {...propParameters, theme: context},
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
