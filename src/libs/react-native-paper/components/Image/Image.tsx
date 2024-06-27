import React, {useEffect} from 'react';
import {TouchableOpacity, Image as PaperImage, ImageProps} from 'react-native';
interface ElementProps {
  props: ImageProps;
  content: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onElementLoaded: (elementProps: ElementProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (elementProps: ElementProps) => void;
}
const Image: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <TouchableOpacity {...elementProps}>
      <PaperImage
        {...elementProps['props']}
        source={{uri: elementProps['value']}}
        {...elementProps}
      />
    </TouchableOpacity>
  );
};

export default Image;
