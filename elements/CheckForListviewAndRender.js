import React from 'react';
import NANO from '../Constants';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';

function CheckForListviewAndRender({elemOb, navigation, onPress}) {
  if (elemOb['component'] === NANO.LISTVIEW) {
    return <RecycleTestComponent {...elemOb} navigation={navigation} />;
  } else {
    <UniversalElement
      elemObj={elemOb}
      navigation={navigation}
      onPress={onPress}
    />;
  }
}

export default CheckForListviewAndRender;
