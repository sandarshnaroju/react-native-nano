import React, {useEffect} from 'react';
import {Tooltip as NanoTooltip} from 'react-native-paper';

function Tooltip({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NanoTooltip {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NanoTooltip>
  );
}

export default Tooltip;
