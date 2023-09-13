import React, {useEffect} from 'react';
import {Dialog} from 'react-native-paper';
import {ScrollView} from 'react-native';

function NanoDialogScrollArea({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.ScrollArea {...elementProps} {...elementProps['props']}>
      <ScrollView {...elementProps['scrollViewProps']}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </ScrollView>
    </Dialog.ScrollArea>
  );
}

export default NanoDialogScrollArea;
