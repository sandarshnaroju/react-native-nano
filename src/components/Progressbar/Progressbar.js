import React, {useEffect} from 'react';
import {ProgressBar as PaperProgressbar} from 'react-native-paper';
function Progressbar({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperProgressbar
      progress={elementProps['value']}
      {...elementProps['props']}
      {...elementProps}
    />
  );
}

export default Progressbar;
