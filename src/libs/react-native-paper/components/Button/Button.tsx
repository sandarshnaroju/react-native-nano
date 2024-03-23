import React, {useEffect} from 'react';
import {Button as PaperButton, ButtonProps} from 'react-native-paper';
interface ElementProps {
  props: ButtonProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Button: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperButton {...elementProps.props} {...elementProps}>
      {elementProps.value}
    </PaperButton>
  );
};

export default Button;
