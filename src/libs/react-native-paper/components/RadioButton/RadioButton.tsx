import React, {useEffect} from 'react';
import {
  RadioButton as PaperRadioButton,
  RadioButtonProps,
} from 'react-native-paper';
interface ElementProps {
  props: RadioButtonProps;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const RadioButton: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <PaperRadioButton {...elementProps} {...elementProps.props} />;
};
export default RadioButton;
