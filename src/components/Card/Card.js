import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function Card({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperCard {...elementProps}>
      <PaperCard.Content {...elementProps['contentProps']}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </PaperCard.Content>
    </PaperCard>
  );
}

export default Card;
