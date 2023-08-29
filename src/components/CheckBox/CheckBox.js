import React, {useEffect} from 'react';
import {Checkbox as PaperCheckBox} from 'react-native-paper';

function CheckBox({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCheckBox
      {...elementProps['props']}
      status={
        elementProps['value'] != null
          ? elementProps['value']
            ? 'checked'
            : 'unchecked'
          : 'indeterminate'
      }
      {...elementProps}
    />
  );
}

export default CheckBox;
