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
}) {
  const displayItem = getElementAsPerComponent({
    elemOb: elemObj,
    index: uniqueKey,

    customComponents,
    getUi,
    onPressCallBack,
    propParameters,
    recyclerListViewFunctionProps,
    uniqueKey,
  });
  if (elemObj != null && elemObj['animation']) {
    return (
      <Animatable.View {...elemObj['animation']}>{displayItem}</Animatable.View>
    );
  }

  return displayItem;
}

export default UniversalElement;
