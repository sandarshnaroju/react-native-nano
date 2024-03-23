import React, {useEffect} from 'react';
import {Card as PaperCard, CardContentProps} from 'react-native-paper';

interface ElementProps {
  props: CardContentProps;
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

const CardContent: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard.Content {...elementProps} {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </PaperCard.Content>
  );
};

export default CardContent;
