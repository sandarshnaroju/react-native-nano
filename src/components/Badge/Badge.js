import React from 'react';
import {Badge as PaperBadge} from 'react-native-paper';

function Badge({heightWeightFormattedElemObj, funProps, elemOb}) {
  return (
    <PaperBadge {...heightWeightFormattedElemObj['props']} {...funProps}>
      {elemOb['value']}
    </PaperBadge>
  );
}

export default Badge;
