import React from 'react';
import {NANO} from '../utils/Constants';
import NanoTopTabs from '../navigation/toptabs/TopTabs';
import NanoFlatlist from './Flatlist';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';

function CheckForListviewAndRender({elemOb, navigation, onPress}) {
  switch (elemOb['component']) {
    case NANO.LIST_VIEW:
      return (
        <RecycleTestComponent
          {...elemOb}
          navigation={navigation}
          onPress={onPress}
        />
      );
    case NANO.FLAT_LIST:
      return (
        <NanoFlatlist {...elemOb} navigation={navigation} onPress={onPress} />
      );
    case NANO.TOP_TABS:
      console.log('top tabs');

      return <NanoTopTabs drawerObj={elemOb} />;

    default:
      return (
        <UniversalElement
          elemObj={elemOb}
          navigation={navigation}
          onPress={onPress}
        />
      );
  }
}
// function areEqual(prevProps, nextProps) {
//   /*
//     return true if passing nextProps to render would return
//     the same result as passing prevProps to render,
//     otherwise return false
//     */
//   if (isEqual(nextProps, prevProps)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// export default React.memo(CheckForListviewAndRender, areEqual);

export default CheckForListviewAndRender;
