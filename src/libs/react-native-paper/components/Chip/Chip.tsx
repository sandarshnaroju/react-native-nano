import React, {useEffect} from 'react';
import {Chip as PaperChip, ChipProps} from 'react-native-paper';

interface ElementProps {
  props: ChipProps;
  value: React.ReactNode;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Chip: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperChip
      {...elementProps.props}
      style={elementProps.props?.style}
      {...elementProps}>
      {elementProps.value}
    </PaperChip>
  );
};
export default Chip;
