import React, {useEffect} from 'react';
import {Avatar, AvatarTextProps} from 'react-native-paper';

interface ElementProps {
  props: AvatarTextProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const AvatarText: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Avatar.Text
      {...elementProps.props}
      label={elementProps.value}
      {...elementProps}
    />
  );
};

export default AvatarText;
