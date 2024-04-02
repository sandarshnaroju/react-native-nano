import isEqual from 'lodash/isEqual';
import React, {ReactElement} from 'react';
import {getPlatform} from '../modules/platform/platform';
import NanoBottomTabs from '../navigation/bottomtabs/BottomTabs';
import NanoTopTabs from '../navigation/toptabs/TopTabs';
import NANO from '../../Constants';
import {
  checkNameAndRenderCustomComponent,
  getInterceptedFunctionProps,
  getViewItems,
  heightAndWidthFormatterForComponentObj,
  modifyElemObjAsPerTheme,
  onElementLoaded,
} from '../utils/Utilities';
import NanoFlatlist from './Flatlist';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';
import {animateUi} from '../hooks/UseReanimationHook';
import ReanimatedFlatlist from './ReanimatedFlatlist';
interface Props {
  // onPress: () => void;
  // onLongPress: () => void;
  index: number;
  [key: string]: any;
  packages;
}

function CheckForListviewAndRender({
  navigation,
  // onPress,
  // onLongPress,

  propParameters,
  funProps,
  onPressCallBack,
  logicObject,
  getUi,
  index,
  themes,
  unModifiedElemOb,
  context,
  packages,
}: Props): ReactElement {
  if (
    unModifiedElemOb != null &&
    unModifiedElemOb['platform'] != null &&
    unModifiedElemOb['platform'].length > 0 &&
    !unModifiedElemOb['platform'].includes(getPlatform())
  ) {
    return null;
  }
  if (unModifiedElemOb['hide'] != null && unModifiedElemOb['hide'] == true) {
    return null;
  }

  switch (unModifiedElemOb['component']) {
    case NANO.LIST_VIEW:
      const heightWeightFormattedElemObj =
        heightAndWidthFormatterForComponentObj(unModifiedElemOb);

      return (
        <RecycleTestComponent
          {...heightWeightFormattedElemObj}
          navigation={navigation}
          // onPress={onPress}
          // onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          packages={packages}
          propParameters={propParameters}
          onElementLoaded={onElementLoaded}
          funProps={funProps}
          getUi={getUi}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          context={context}
          animateUi={animateUi}
        />
      );

    case NANO.FLAT_LIST:
      if (
        unModifiedElemOb != null &&
        unModifiedElemOb['animation'] != null &&
        unModifiedElemOb['animation']['advanced'] != null
      ) {
        return (
          <ReanimatedFlatlist
            {...unModifiedElemOb}
            navigation={navigation}
            // onPress={onPress}
            // onLongPress={onLongPress}
            onPressCallBack={onPressCallBack}
            propParameters={propParameters}
            packages={packages}
            funProps={funProps}
            logicObject={logicObject}
            themes={themes}
            unModifiedElemOb={unModifiedElemOb}
            moduleParameters={propParameters}
            unModifiedScreen={unModifiedElemOb}
            context={context}
            getUi={getUi}
          />
        );
      }

      return (
        <NanoFlatlist
          {...unModifiedElemOb}
          navigation={navigation}
          // onPress={onPress}
          // onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          moduleParameters={propParameters}
          unModifiedScreen={unModifiedElemOb}
          packages={packages}
          context={context}
          getUi={getUi}
        />
      );

    case NANO.TOP_TABS:
      return (
        <NanoTopTabs
          drawerObj={unModifiedElemOb}
          navigation={navigation}
          // onLongPress={onLongPress}
          // databaseConfigObject={databaseConfigObject}
          // onPressCallBack={onPressCallBack}
          // propParameters={propParameters}
          // unModifiedElemOb={unModifiedElemOb}
          // funProps={funProps}
          // logicObject={logicObject}
          themes={themes}
          context={context}
          moduleParameters={propParameters}
          // unModifiedScreen={unModifiedElemOb}
          packages={packages}
        />
      );

    case NANO.BOTTOM_TABS:
      return (
        <NanoBottomTabs
          drawerObj={unModifiedElemOb}
          navigation={navigation}
          // route={route}
          // databaseConfigObject={databaseConfigObject}
          // onLongPress={onLongPress}
          // onPressCallBack={onPressCallBack}
          // propParameters={propParameters}
          // unModifiedElemOb={unModifiedElemOb}
          // funProps={funProps}
          // logicObject={logicObject}
          themes={themes}
          packages={packages}
          context={context}
          moduleParameters={propParameters}
          // unModifiedScreen={unModifiedElemOb}
        />
      );

    default:
      return (
        <UniversalElement
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          getUi={getUi}
          key={index}
          uniqueKey={index}
          packages={packages}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          context={context}
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
