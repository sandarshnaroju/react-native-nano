import React, {useEffect} from 'react';
import {RadioButton, RadioButtonAndroidProps} from 'react-native-paper';

interface ElementProps {
  props: RadioButtonAndroidProps;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const RadioButtonAndroid: React.FC<Props> = ({
  elementProps,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <RadioButton.Android {...elementProps} {...elementProps.props} />;
};

export default RadioButtonAndroid;
