import React from 'react';
import {ProgressBar as PaperProgressbar} from 'react-native-paper';
function Progressbar({elemOb, heightWeightFormattedElemObj, funProps}) {
  return (
    <PaperProgressbar
      progress={elemOb['value']}
      {...heightWeightFormattedElemObj['props']}
      {...funProps}
    />
  );
}

export default Progressbar;
