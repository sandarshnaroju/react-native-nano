import isEqual from 'lodash/isEqual';
import React from 'react';
import {getPlatform} from '../modules/platform/platform';
import NanoBottomTabs from '../navigation/bottomtabs/BottomTabs';
import NanoTopTabs from '../navigation/toptabs/TopTabs';
import NANO from '../utils/Constants';
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

function CheckForListviewAndRender({
  navigation,
  onPress,
  onLongPress,
  route,
  customComponents,
  databaseConfigObject,
  propParameters,
  funProps,
  onPressCallBack,
  logicObject,
  getUi,
  index,
  themes,
  unModifiedElemOb,
  context,
}) {
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
          onPress={onPress}
          route={route}
          onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          onElementLoaded={onElementLoaded}
          funProps={funProps}
          getUi={getUi}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          context={context}
          customComponents={customComponents}
          animateUi={animateUi}
        />
      );

    case NANO.FLAT_LIST:
      if (unModifiedElemOb != null && unModifiedElemOb['animation'] != null) {
        return (
          <ReanimatedFlatlist
            {...unModifiedElemOb}
            navigation={navigation}
            onPress={onPress}
            onLongPress={onLongPress}
            route={route}
            onPressCallBack={onPressCallBack}
            propParameters={propParameters}
            funProps={funProps}
            logicObject={logicObject}
            themes={themes}
            unModifiedElemOb={unModifiedElemOb}
            customComponents={customComponents}
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
          onPress={onPress}
          onLongPress={onLongPress}
          route={route}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          customComponents={customComponents}
          moduleParameters={propParameters}
          unModifiedScreen={unModifiedElemOb}
          context={context}
          getUi={getUi}
        />
      );

    case NANO.TOP_TABS:
      return (
        <NanoTopTabs
          drawerObj={unModifiedElemOb}
          navigation={navigation}
          route={route}
          onLongPress={onLongPress}
          databaseConfigObject={databaseConfigObject}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          unModifiedElemOb={unModifiedElemOb}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
          context={context}
          customComponents={customComponents}
          moduleParameters={propParameters}
          unModifiedScreen={unModifiedElemOb}
        />
      );

    case NANO.BOTTOM_TABS:
      return (
        <NanoBottomTabs
          drawerObj={unModifiedElemOb}
          navigation={navigation}
          route={route}
          databaseConfigObject={databaseConfigObject}
          onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          unModifiedElemOb={unModifiedElemOb}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
          context={context}
          customComponents={customComponents}
          moduleParameters={propParameters}
          unModifiedScreen={unModifiedElemOb}
        />
      );

    default:
      const elemObjAfterThemesSet = modifyElemObjAsPerTheme(
        unModifiedElemOb,
        themes,
        context,
      );
      const customfunProps = getInterceptedFunctionProps({
        eleObject: elemObjAfterThemesSet,
        props: {
          moduleParams: {...propParameters, theme: context},

          setUi: onPressCallBack,
          getUi: getUi,
        },
      });
      const elementProps = {
        ...elemObjAfterThemesSet,
        ...customfunProps,
      };
      const getViewItemsUpdated = (
        contentArr,
        shouldOnpPressAllowed,
        onComponentLoaded,
        uniKey = index,
      ) => {
        return getViewItems({
          content: contentArr,
          customComponents,
          getUi,
          onElementLoaded,
          onPressCallBack,
          propParameters,
          uniqueKey: uniKey,
        });
      };
      const Custom = checkNameAndRenderCustomComponent({
        componentName: elemObjAfterThemesSet['component'],
        compsArray: customComponents,
        props: propParameters,
        onElementLoaded: onElementLoaded,
        elementProps,
        getViewItems: getViewItemsUpdated,
      });

      if (Custom) {
        return Custom;
      }

      return (
        <UniversalElement
          customComponents={customComponents}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          getUi={getUi}
          key={index}
          uniqueKey={index}
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
