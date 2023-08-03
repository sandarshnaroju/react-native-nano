import React, {useEffect} from 'react';
import {Divider as PaperDivider} from 'react-native-paper';

function Divider({heightWeightFormattedElemObj, funProps, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(heightWeightFormattedElemObj);
  }, []);
  return (
    <PaperDivider {...heightWeightFormattedElemObj['props']} {...funProps} />
  );
}

export default Divider;
