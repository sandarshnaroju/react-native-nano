import React, {useEffect} from 'react';
import {TouchableOpacity, ImageBackground as NativeImageBackground, ImageBackgroundProps} from 'react-native';
interface ElementProps {
  props: ImageBackgroundProps;
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
      <NativeImageBackground
        {...elementProps['props']}
        source={{uri: elementProps['value']}}
        {...elementProps}
      />
    </TouchableOpacity>
  );
};

export default Image;
