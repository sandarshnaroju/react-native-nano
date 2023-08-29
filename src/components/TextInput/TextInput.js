import React, {useEffect} from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';

function TextInput({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperTextInput
      {...elementProps['props']}
      // style={{}}
      scrollEnabled={false}
      value={elementProps['value']}
      {...elementProps}
    />
  );
}

export default TextInput;
