import React, {useEffect} from 'react';
import {Card as PaperCard, CardActionsProps} from 'react-native-paper';

interface ElementProps {
  props: CardActionsProps;
  content: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onElementLoaded: (elementProps: ElementProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const CardAction: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Actions {...elementProps} {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </PaperCard.Actions>
  );
};

export default CardAction;
