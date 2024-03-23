import React, {useEffect} from 'react';
import {Checkbox as PaperCheckBox, CheckboxProps} from 'react-native-paper';

interface ElementProps {
  props: CheckboxProps;
  value: boolean | null;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const CheckBox: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperCheckBox
      {...elementProps.props}
      status={
        elementProps.value != null
          ? elementProps.value
            ? 'checked'
            : 'unchecked'
          : 'indeterminate'
      }
      {...elementProps}
    />
  );
};

export default CheckBox;
