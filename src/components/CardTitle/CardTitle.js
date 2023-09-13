import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function CardTitle({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Title title={elementProps['value']} {...elementProps['props']} />
  );
}

export default CardTitle;
