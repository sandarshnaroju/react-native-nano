import React from 'react';
import {ActivityIndicator as PaperActivityIndicator} from 'react-native-paper';

function ActivityIndicator({
  funProps,
  heightWeightFormattedElemObj,
  elemOb,
  index,
}) {
  return (
    <PaperActivityIndicator
      {...heightWeightFormattedElemObj['props']}
      style={
        heightWeightFormattedElemObj != null &&
        heightWeightFormattedElemObj['props'] != null
          ? heightWeightFormattedElemObj['props']['style']
          : null
      }
      animating={elemOb['value']}
      key={'activityindicator' + index}
      {...funProps}
    />
  );
}

export default ActivityIndicator;
