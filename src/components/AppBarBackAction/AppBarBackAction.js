import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';

function AppBarBackAction({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <Appbar.BackAction {...elementProps['props']} {...elementProps} />;
}

export default AppBarBackAction;
