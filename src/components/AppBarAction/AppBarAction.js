import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';

function NanoAppBarAction({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <Appbar.Action {...elementProps['props']} {...elementProps} />;
}

export default NanoAppBarAction;
