import {isEqual} from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import NANO from '../Constants';
import {Nano} from '../Nano';
import NanoTopTabs from '../toptabs/TopTabs';

function GenericScreen({
  navigation,
  screen,
  logic,
  screenComponent,
  content,
  routes,
  screenObj,
}) {
  // console.log('content', content);

  switch (screenComponent) {
    case NANO.TOP_TABS:
      return <NanoTopTabs drawerObj={screenObj} />;

    default:
      break;
  }
  return (
    <Nano
      scroll={false}
      style={styles.viewStyle}
      screen={screen}
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
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
});
