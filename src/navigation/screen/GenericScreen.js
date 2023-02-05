import {isEqual} from 'lodash';
import React from 'react';
import Nano from '../../nano/Nano';
import NANO from '../../utils/Constants';
import NanoTopTabs from '../toptabs/TopTabs';

function GenericScreen({
  navigation,
  logic,

  screenObj,
  uri = null,
}) {
  if (screenObj != null) {
    switch (screenObj.component) {
      case NANO.TOP_TABS:
        return <NanoTopTabs drawerObj={screenObj} />;

      default:
        break;
    }
  }

  return (
    <Nano
      scroll={false}
      style={screenObj != null && screenObj.style ? screenObj.style : {}}
      screen={screenObj.screen}
      navigation={navigation}
      logicObject={logic}
      screenName={screenObj.name}
      onStart={screenObj.onStart}
      onEnd={screenObj.onEnd}
    />
  );
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
export default React.memo(GenericScreen, areEqual);
