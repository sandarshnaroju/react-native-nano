import React, {useEffect} from 'react';
import {Divider as PaperDivider, DividerProps} from 'react-native-paper';
interface ElementProps {
  props: DividerProps;
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
const Divider: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return <PaperDivider {...elementProps['props']} {...elementProps} />;
};

export default Divider;
