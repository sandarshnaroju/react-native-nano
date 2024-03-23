import React, {useEffect} from 'react';
import {Card as PaperCard, CardCoverProps} from 'react-native-paper';

interface ElementProps {
  props: CardCoverProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const CardCover: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperCard.Cover
      source={{uri: elementProps.value}}
      {...elementProps.props}
      {...elementProps}
    />
  );
};

export default CardCover;
