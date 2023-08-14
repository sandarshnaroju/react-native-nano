import React, {useState, useCallback, useRef} from 'react';
import {Button, View, Alert} from 'react-native';
import Youtube from 'react-native-youtube-iframe';

function YoutubePlayer({
  elemOb,
  isOnPressAllowed,
  onPress,
  funProps,
  heightWeightFormattedElemObj,
  index,
  onElementLoaded,
}) {
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback(state => {
    console.log('hehehhehe');

    if (state === 'ended') {
      // setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const extractVideoIdFromLink = link => {
    if (link != null) {
      return link.slice('https://www.youtube.com/watch?v='.length);
    } else {
      return 'iKYHf22qVdM';
    }
  };

  return (
    <Youtube
      {...heightWeightFormattedElemObj['props']}
      {...funProps}
      // play={playing}
      videoId={extractVideoIdFromLink(heightWeightFormattedElemObj['value'])}
      // onChangeState={onStateChange}
    />
  );
}

export default YoutubePlayer;
