import React, {useEffect} from 'react';
import {
  SegmentedButtons as NanoSegmentedButtons,
  SegmentedButtonsProps,
} from 'react-native-paper';
interface ElementProps {
  props: SegmentedButtonsProps;
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
const SegmentedButtons: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <NanoSegmentedButtons {...elementProps['props']} {...elementProps} />;
};

export default SegmentedButtons;
