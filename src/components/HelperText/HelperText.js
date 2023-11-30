import React, {useEffect} from 'react';
import {HelperText as NanoHelperText} from 'react-native-paper';

function HelperText({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NanoHelperText {...elementProps} {...elementProps['props']}>
      {elementProps['value']}
    </NanoHelperText>
  );
}

export default HelperText;
