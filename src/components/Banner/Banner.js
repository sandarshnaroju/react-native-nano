import React, {useEffect} from 'react';
import {Banner as PaperBanner} from 'react-native-paper';

function Banner({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperBanner {...elementProps['props']} {...elementProps}>
      {elementProps['value']}
    </PaperBanner>
  );
}

export default Banner;
