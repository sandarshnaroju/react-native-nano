import React from 'react';
import {Banner as PaperBanner} from 'react-native-paper';

function Banner({heightWeightFormattedElemObj, funProps, elemOb}) {
  return (
    <PaperBanner {...heightWeightFormattedElemObj['props']} {...funProps}>
      {elemOb['value']}
    </PaperBanner>
  );
}

export default Banner;
