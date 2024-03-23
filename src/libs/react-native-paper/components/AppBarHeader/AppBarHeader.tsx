import React, {useEffect} from 'react';
import {Appbar, AppbarHeaderProps} from 'react-native-paper';

interface ElementProps {
  [key: string]: any;
  props: AppbarHeaderProps;
}

interface NanoAppBarHeaderProps {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onLoaded: (props: ElementProps) => void,
  ) => JSX.Element;
  onElementLoaded: (props: ElementProps) => void;
}

const NanoAppBarHeader: React.FC<NanoAppBarHeaderProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Appbar.Header {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Appbar.Header>
  );
};

export default NanoAppBarHeader;
