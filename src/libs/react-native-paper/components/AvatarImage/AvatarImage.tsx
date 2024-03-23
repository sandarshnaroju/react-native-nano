import React, {useEffect} from 'react';
import {Avatar, AvatarImageProps} from 'react-native-paper';

interface ElementProps {
  props: AvatarImageProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const AvatarImage: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Avatar.Image
      {...elementProps.props}
      source={{uri: elementProps.value}}
      {...elementProps}
    />
  );
};

export default AvatarImage;
