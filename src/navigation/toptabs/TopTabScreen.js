import React from 'react';

import {isEqual} from 'lodash';

import {TopTabNano} from '../../nano/TopTabNano';

function TopTabScreen({
  screen,
  navigation,

  route,
}) {
  return (
    <TopTabNano
      scroll={false}
      screen={screen.screen}
      navigation={navigation}
      logicObject={screen.logic}
      style={screen != null && screen.style ? screen.style : {}}
      screenName={screen.name}
      onStart={screen.onStart}
      onEnd={screen.onEnd}
      route={route}
    />
  );
}

// export default TopTabScreen;
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
export default React.memo(TopTabScreen, areEqual);
