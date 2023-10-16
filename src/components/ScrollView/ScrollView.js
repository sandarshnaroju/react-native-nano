import React, {useEffect} from 'react';
import {ScrollView as NativeScrollView} from 'react-native';

function ScrollView({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeScrollView {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NativeScrollView>
  );
}

export default ScrollView;
