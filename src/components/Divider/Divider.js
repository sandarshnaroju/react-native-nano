import React, {useEffect} from 'react';
import {Divider as PaperDivider} from 'react-native-paper';

function Divider({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <PaperDivider {...elementProps['props']} {...elementProps} />;
}

export default Divider;
