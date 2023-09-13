import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function CardAction({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Actions {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </PaperCard.Actions>
  );
}

export default CardAction;
