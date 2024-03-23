import React, {useEffect} from 'react';
import {Appbar, AppbarContentProps} from 'react-native-paper';

interface ElementProps {
  [key: string]: any;
  props: AppbarContentProps;
}

interface NanoAppBarContentProps {
  elementProps: ElementProps;
  getViewItems: () => void;
  onElementLoaded: (props: ElementProps) => void;
}

const NanoAppBarContent: React.FC<NanoAppBarContentProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, [elementProps, onElementLoaded]);

  return <Appbar.Content {...elementProps['props']} {...elementProps} />;
};

export default NanoAppBarContent;
