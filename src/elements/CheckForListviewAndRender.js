import {isEqual} from 'lodash';
import React from 'react';
import NanoBottomTabs from '../navigation/bottomtabs/BottomTabs';
// import DrawerNavigation from '../navigation/drawer/Drawer';
import NanoTopTabs from '../navigation/toptabs/TopTabs';
import NANO from '../utils/Constants';
import NanoFlatlist from './Flatlist';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';

function CheckForListviewAndRender({
  elemOb,
  navigation,
  onPress,
  route,
  databaseConfigObject,
}) {
  switch (elemOb['component']) {
    case NANO.LIST_VIEW:
      return (
        <RecycleTestComponent
          {...elemOb}
          navigation={navigation}
          onPress={onPress}
          route={route}
        />
      );
    case NANO.FLAT_LIST:
      return (
        <NanoFlatlist
          {...elemOb}
          navigation={navigation}
          onPress={onPress}
          route={route}
        />
      );

    case NANO.TOP_TABS:
      return (
        <NanoTopTabs
          drawerObj={elemOb}
          navigation={navigation}
          route={route}
          databaseConfigObject={databaseConfigObject}
        />
      );
    case NANO.BOTTOM_TABS:
      return (
        <NanoBottomTabs
          drawerObj={elemOb}
          navigation={navigation}
          route={route}
          databaseConfigObject={databaseConfigObject}
        />
      );
    // case NANO.DRAWER:
    //   return (
    //     <DrawerNavigation
    //       drawerObj={elemOb}
    //       navigation={navigation}
    //       route={route}
    //       databaseConfigObject={databaseConfigObject}
    //     />
    //   );

    default:
      return (
        <UniversalElement
          elemObj={elemOb}
          navigation={navigation}
          onPress={onPress}
          route={route}
        />
      );
  }
}
function areEqual(prevProps, nextProps) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  if (isEqual(nextProps, prevProps)) {
    return true;
  } else {
    return false;
  }
}
export default React.memo(CheckForListviewAndRender, areEqual);

// export default CheckForListviewAndRender;
