import React, {useEffect} from 'react';
function VideoPlayer({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return null;
}

export default VideoPlayer;
