import React, {useEffect} from 'react';
import {Appbar, AppbarBackActionProps} from 'react-native-paper';

interface NanoAppBarBackActionProps {
  elementProps: {
    props: AppbarBackActionProps;
  };
  getViewItems: (
    content: React.ReactNode,
    onElementLoaded: (props: any) => void,
  ) => React.ReactNode;
  onElementLoaded: (props: any) => void;
}

const NanoAppBarBackAction: React.FC<NanoAppBarBackActionProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <Appbar.BackAction {...elementProps.props} />;
};
export default NanoAppBarBackAction;
