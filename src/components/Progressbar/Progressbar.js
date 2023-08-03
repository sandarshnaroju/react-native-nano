import React, {useEffect} from 'react';
import {ProgressBar as PaperProgressbar} from 'react-native-paper';
function Progressbar({
  elemOb,
  heightWeightFormattedElemObj,
  funProps,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperProgressbar
      progress={elemOb['value']}
      {...heightWeightFormattedElemObj['props']}
      {...funProps}
    />
  );
}

export default Progressbar;
