import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';

function AppBarHeader({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Appbar.Header {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Appbar.Header>
  );
}

export default AppBarHeader;
