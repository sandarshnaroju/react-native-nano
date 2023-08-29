import React, {useEffect} from 'react';
import {Button as PaperButton} from 'react-native-paper';

function Button({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperButton {...elementProps['props']} {...elementProps}>
      {elementProps['value']}
    </PaperButton>
  );
}

export default Button;
