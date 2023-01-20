import {isEqual} from 'lodash';
import React from 'react';
import {Nano} from '../../nano/Nano';

function TopTabScreen({screen, navigation}) {
  return (
    <Nano
      scroll={false}
      screen={screen.screen}
      navigation={navigation}
      logicObject={screen.logic}
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
