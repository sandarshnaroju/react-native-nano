import React, {useEffect} from 'react';
import {RadioButton, RadioButtonItemProps} from 'react-native-paper';

interface ElementProps {
  props: RadioButtonItemProps;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const RadioButtonItem: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <RadioButton.Item {...elementProps} {...elementProps.props} />;
};
export default RadioButtonItem;
