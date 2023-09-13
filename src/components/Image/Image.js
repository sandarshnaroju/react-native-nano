import React, {useEffect} from 'react';
import {TouchableOpacity, Image as PaperImage} from 'react-native';

function Image({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <TouchableOpacity {...elementProps}>
      <PaperImage
        {...elementProps['props']}
        {...elementProps}
        source={elementProps['value']}
      />
    </TouchableOpacity>
  );
}

export default Image;
