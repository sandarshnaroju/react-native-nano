import React, {useEffect} from 'react';
import {Banner as PaperBanner, BannerProps} from 'react-native-paper';

interface ElementProps {
  props: BannerProps;
  value: React.ReactNode;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Banner: React.FC<Props> = ({elementProps, onElementLoaded}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <PaperBanner {...elementProps.props} {...elementProps}>
      {elementProps.value}
    </PaperBanner>
  );
};

export default Banner;
