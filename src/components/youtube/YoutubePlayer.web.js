import React, {useState} from 'react';
import {View} from 'react-native';
function YoutubePlayer({elementProps, getViewItems, onElementLoaded}) {
  let ref = null;

  const onLoad = () => {
    onElementLoaded(elementProps);
  };
  useState(() => {
    if (ref) {
      ref.playVideo();
    }
  }, [elementProps['value']]);

  return (
    <iframe
      {...elementProps['props']}
      {...elementProps}
      onLoad={onLoad}
      src={elementProps['value']}
      style={{}}
      ref={ref}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  );
}

export default YoutubePlayer;
