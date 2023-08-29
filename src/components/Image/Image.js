import React, {useEffect} from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity, Image as PaperImage} from 'react-native';

function Image({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  const imgSource =
    elementProps != null && elementProps['value'] != null
      ? elementProps['value'].indexOf('http') == 0
        ? {uri: elementProps['value']}
        : elementProps['value']
      : null;
  if (imgSource) {
    return (
      <TouchableOpacity {...elementProps}>
        <PaperImage
          {...elementProps['props']}
          {...elementProps}
          source={imgSource}
        />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

export default Image;
