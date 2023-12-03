import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';

function NanoAppBarContent({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <Appbar.Content {...elementProps['props']} {...elementProps} />;
}

export default NanoAppBarContent;
