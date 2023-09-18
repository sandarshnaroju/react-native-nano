import React, {useEffect} from 'react';
import Video from 'react-native-video';
function VideoPlayer({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Video
      source={elementProps['value']} // Can be a URL or a local file.
      {...(elementProps != null && elementProps['props'] != null
        ? elementProps['props']
        : {})}
      {...elementProps}
    />
  );
}

export default VideoPlayer;
