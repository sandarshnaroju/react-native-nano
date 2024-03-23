import React, {useEffect} from 'react';
import {RadioButton, RadioButtonGroupProps} from 'react-native-paper';

interface ElementProps {
  props: RadioButtonGroupProps;
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

const RadioButtonGroup: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <RadioButton.Group {...elementProps} {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </RadioButton.Group>
  );
};
export default RadioButtonGroup;
