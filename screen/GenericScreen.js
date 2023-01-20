import {isEqual} from 'lodash';
import React, {useEffect} from 'react';
import {NANO} from '../utils/Constants';
import {Nano} from '../Nano';
import NanoTopTabs from '../toptabs/TopTabs';

function GenericScreen({
  navigation,
  logic,

  screenObj,
}) {
  useEffect(() => {
    if (screenObj != null && screenObj.onStart != null) {
      logic[screenObj.onStart]();
    }
    return () => {
      if (screenObj != null && screenObj.onStart != null) {
        logic[screenObj.onEnd]();
      }
    };
  }, [screenObj]);

  switch (screenObj.component) {
    case NANO.TOP_TABS:
      return <NanoTopTabs drawerObj={screenObj} />;

    default:
      break;
  }

  return (
    <Nano
      scroll={false}
      style={screenObj.style}
      screen={screenObj.screen}
      navigation={navigation}
      logicObject={logic}
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
