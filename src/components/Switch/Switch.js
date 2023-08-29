import React, {useEffect} from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';

function Switch({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <PaperSwitch {...elementProps['props']} {...elementProps} />;
}

export default Switch;
