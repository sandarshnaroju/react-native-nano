import React, {useEffect} from 'react';
import {Appbar, AppbarBackActionProps} from 'react-native-paper';

interface NanoAppBarBackActionProps {
  elementProps: {
    props: AppbarBackActionProps;
  };
  getViewItems: (
    content: React.ReactNode,
    onElementLoaded: (props: Appbar.BackActionProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (props: Appbar.BackActionProps) => void;
}

const NanoAppBarBackAction: React.FC<NanoAppBarBackActionProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps.props);
  }, []);

  return <Appbar.BackAction {...elementProps.props} />;
};
export default NanoAppBarBackAction;
