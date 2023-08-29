import React, {useEffect} from 'react';
import {IconButton as PaperIconButton} from 'react-native-paper';

function IconButton({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperIconButton
      {...elementProps['props']}
      icon={elementProps['value']}
      {...elementProps}
    />
  );
}

export default IconButton;
