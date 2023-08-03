import React, {useEffect} from 'react';
import {Banner as PaperBanner} from 'react-native-paper';

function Banner({
  heightWeightFormattedElemObj,
  funProps,
  elemOb,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperBanner {...heightWeightFormattedElemObj['props']} {...funProps}>
      {elemOb['value']}
    </PaperBanner>
  );
}

export default Banner;
