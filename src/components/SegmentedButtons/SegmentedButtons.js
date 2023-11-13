import React, {useEffect} from 'react';
import {SegmentedButtons as NanoSegmentedButtons} from 'react-native-paper';

function SegmentedButtons({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <NanoSegmentedButtons {...elementProps['props']} {...elementProps} />;
}

export default SegmentedButtons;
