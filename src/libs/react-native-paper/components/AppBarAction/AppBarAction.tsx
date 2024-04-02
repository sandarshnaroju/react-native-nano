import React, {useEffect} from 'react';
import {Appbar, AppbarActionProps} from 'react-native-paper';

interface NanoAppBarActionProps {
  elementProps: {
    props: AppbarActionProps;
  };
  getViewItems: (
    content: React.ReactNode,
    onElementLoaded: (props: any) => void,
  ) => React.ReactNode;
  onElementLoaded: (props: any) => void;
}

const NanoAppBarAction: React.FC<NanoAppBarActionProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <Appbar.Action {...elementProps.props} />;
};

export default NanoAppBarAction;
