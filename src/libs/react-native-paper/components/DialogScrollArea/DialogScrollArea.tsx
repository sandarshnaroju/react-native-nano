import React, {useEffect} from 'react';
import {Dialog, DialogScrollAreaProps} from 'react-native-paper';
import {ScrollView} from 'react-native';
interface ElementProps {
  props: DialogScrollAreaProps;
  content: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onElementLoaded: (elementProps: ElementProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const NanoDialogScrollArea: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
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
};

export default NanoDialogScrollArea;
