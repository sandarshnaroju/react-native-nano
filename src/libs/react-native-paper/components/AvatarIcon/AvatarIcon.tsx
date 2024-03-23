import React, {useEffect} from 'react';
import {Avatar, AvatarIconProps} from 'react-native-paper';

interface ElementProps {
  [key: string]: any;
  props: AvatarIconProps;
}

interface AvatarImageProps {
  elementProps: ElementProps;
  getViewItems: () => void;
  onElementLoaded: (props: ElementProps) => void;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <Avatar.Icon {...elementProps} />;
};

export default AvatarImage;
