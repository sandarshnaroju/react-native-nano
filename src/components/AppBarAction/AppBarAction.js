import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';

function AppBarAction({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <Appbar.Action {...elementProps['props']} {...elementProps} />;
}

export default AppBarAction;
