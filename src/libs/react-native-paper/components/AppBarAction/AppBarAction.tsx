import React, {useEffect} from 'react';
import {Appbar, AppbarActionProps} from 'react-native-paper';

interface NanoAppBarActionProps {
  elementProps: {
    props: AppbarActionProps;
  };
  getViewItems: (
    content: React.ReactNode,
    onElementLoaded: (props: Appbar.ActionProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (props: Appbar.ActionProps) => void;
}

const NanoAppBarAction: React.FC<NanoAppBarActionProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps.props);
  }, []);

  return <Appbar.Action {...elementProps.props} />;
};

export default NanoAppBarAction;
