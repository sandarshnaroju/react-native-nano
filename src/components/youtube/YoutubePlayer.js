import React, {useState} from 'react';
import {View} from 'react-native';
function YoutubePlayer({elementProps, getViewItems, onElementLoaded}) {
  let ref = null;
  const extractVideoIdFromLink = link => {
    if (link != null) {
      return link.slice('https://www.youtube.com/watch?v='.length);
    } else {
      return 'iKYHf22qVdM';
    }
  };
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
      src={
        'https://www.youtube.com/embed/' +
        extractVideoIdFromLink(elementProps['value'])
      }
      style={{}}
      ref={ref}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  );
}

export default YoutubePlayer;
