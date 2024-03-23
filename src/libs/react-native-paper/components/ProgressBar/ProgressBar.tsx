import React, {useEffect} from 'react';
import {
  ProgressBar as PaperProgressbar,
  ProgressBarProps,
} from 'react-native-paper';
interface ElementProps {
  props: ProgressBarProps;
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
const Progressbar: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperProgressbar
      progress={elementProps['value']}
      {...elementProps['props']}
      {...elementProps}
    />
  );
};

export default Progressbar;
