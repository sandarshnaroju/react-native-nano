import React, {useEffect} from 'react';
import {RadioButton, RadioButtonIOSProps} from 'react-native-paper';

interface ElementProps {
  props: RadioButtonIOSProps;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const RadioButtonIOS: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <RadioButton.IOS {...elementProps} {...elementProps.props} />;
};

export default RadioButtonIOS;
