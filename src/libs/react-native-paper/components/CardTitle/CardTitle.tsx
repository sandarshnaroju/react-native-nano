import React, {useEffect} from 'react';
import {Card as PaperCard, CardTitleProps} from 'react-native-paper';

interface ElementProps {
  props: CardTitleProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const CardTitle: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <PaperCard.Title title={elementProps.value} {...elementProps.props} />;
};

export default CardTitle;
