import React from 'react';
import NANO from '../Constants';
import NanoFlatlist from './Flatlist';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';

function CheckForListviewAndRender({elemOb, navigation, onPress}) {
  if (elemOb['component'] === NANO.LIST_VIEW) {
    return (
      <RecycleTestComponent
        {...elemOb}
        navigation={navigation}
        onPress={onPress}
      />
    );
  } else if (elemOb['component'] === NANO.FLAT_LIST) {
    return (
      <NanoFlatlist {...elemOb} navigation={navigation} onPress={onPress} />
    );
  } else {
    return (
      <UniversalElement
        elemObj={elemOb}
        navigation={navigation}
        onPress={onPress}
      />
    );
  }
}

export default CheckForListviewAndRender;
