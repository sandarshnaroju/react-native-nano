import React, {useState, useCallback, useRef} from 'react';
import {Button, View, Alert} from 'react-native';
import Youtube from 'react-native-youtube-iframe';

function YoutubePlayer({elementProps, getViewItems, onElementLoaded}) {
  const extractVideoIdFromLink = link => {
    if (link != null) {
      return link.slice('https://www.youtube.com/watch?v='.length);
    } else {
      return 'iKYHf22qVdM';
    }
  };

  return (
    <Youtube
      {...elementProps['props']}
      {...elementProps}
      // play={playing}
      videoId={extractVideoIdFromLink(elementProps['value'])}
      // onChangeState={onStateChange}
    />
  );
}

export default YoutubePlayer;
