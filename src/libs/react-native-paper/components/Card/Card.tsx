import React, {useEffect} from 'react';
import {Card as PaperCard, CardProps} from 'react-native-paper';

interface ElementProps {
  props: any;
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

const Card: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCard {...elementProps} {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </PaperCard>
  );
};

export default Card;
