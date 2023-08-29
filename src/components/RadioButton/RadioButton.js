import React, {useEffect} from 'react';
import {RadioButton as PaperRadioButton} from 'react-native-paper';

function RadioButton({
  elemOb,

  funProps,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperRadioButton
      value="first"
      status={elemOb['value'] ? 'checked' : 'unchecked'}
      {...funProps}
    />
  );
}

export default RadioButton;
