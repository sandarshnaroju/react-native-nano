import React, {useEffect} from 'react';
import Youtube from 'react-native-youtube-iframe';

function YoutubePlayer({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Youtube
      videoId={elementProps['value']}
      {...elementProps['props']}
      {...elementProps}
    />
  );
}

export default YoutubePlayer;
