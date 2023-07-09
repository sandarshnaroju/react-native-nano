import React from 'react';
import {Divider as PaperDivider} from 'react-native-paper';

function Divider({heightWeightFormattedElemObj, funProps}) {
  return (
    <PaperDivider {...heightWeightFormattedElemObj['props']} {...funProps} />
  );
}

export default Divider;
