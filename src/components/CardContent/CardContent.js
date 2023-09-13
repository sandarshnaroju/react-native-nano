import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function CardContent({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Content {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </PaperCard.Content>
  );
}

export default CardContent;
