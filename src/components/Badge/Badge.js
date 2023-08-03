import React, {useEffect} from 'react';
import {Badge as PaperBadge} from 'react-native-paper';

function Badge({
  heightWeightFormattedElemObj,
  funProps,
  elemOb,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperBadge {...heightWeightFormattedElemObj['props']} {...funProps}>
      {elemOb['value']}
    </PaperBadge>
  );
}

export default Badge;
