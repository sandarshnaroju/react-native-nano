import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function Card({
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onPress,
  funProps,
  elemOb,
  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperCard
      {...heightWeightFormattedElemObj['props']}
      onPress={
        isOnPressAllowed
          ? () => {
              onPress({itemJson: elemOb});
            }
          : null
      }
      {...funProps}>
      {getViewItems(elemOb['content'], true)}
    </PaperCard>
  );
}

export default Card;
