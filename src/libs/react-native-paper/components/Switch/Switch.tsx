import React, {useEffect} from 'react';
import {Switch as PaperSwitch, SwitchProps} from 'react-native-paper';
interface ElementProps {
  props: SwitchProps;
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
const Switch: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <PaperSwitch {...elementProps['props']} {...elementProps} />;
};

export default Switch;
