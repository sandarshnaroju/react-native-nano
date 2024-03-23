import React, {useEffect} from 'react';
import {Badge as PaperBadge, BadgeProps} from 'react-native-paper';

interface ElementProps {
  props: BadgeProps;
  value: string;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Badge: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperBadge {...elementProps.props} {...elementProps}>
      {elementProps.value}
    </PaperBadge>
  );
};
export default Badge;
