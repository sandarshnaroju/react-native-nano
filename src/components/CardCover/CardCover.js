import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function CardCover({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Cover
      source={{uri: elementProps['value']}}
      {...elementProps['props']}
      {...elementProps}
    />
  );
}

export default CardCover;
