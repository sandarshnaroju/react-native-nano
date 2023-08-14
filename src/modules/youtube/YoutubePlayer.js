import React, {useState} from 'react';
import {View} from 'react-native';
function YoutubePlayer({
  isOnPressAllowed,
  onPress,
  elemOb,
  funProps,
  heightWeightFormattedElemObj,
  index,
  onElementLoaded,
}) {
  const [youtubeID, setYoutubeId] = useState('iKYHf22qVdM');
  let ref = null;
  const extractVideoIdFromLink = link => {
    if (link != null) {
      return link.slice('https://www.youtube.com/watch?v='.length);
    } else {
      return 'iKYHf22qVdM';
    }
  };
  const onLoad = () => {
    onElementLoaded(elemOb);
  };
  useState(() => {
    if (ref) {
      ref.playVideo();
    }
  }, [heightWeightFormattedElemObj['value']]);

  return (
    <iframe
      {...heightWeightFormattedElemObj['props']}
      {...funProps}
      onLoad={onLoad}
      src={
        'https://www.youtube.com/embed/' +
        extractVideoIdFromLink(heightWeightFormattedElemObj['value'])
      }
      style={{}}
      ref={ref}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  );
}

export default YoutubePlayer;
