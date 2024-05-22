import React, {useEffect} from 'react';
import {Tooltip as NanoTooltip, TooltipProps} from 'react-native-paper';
interface ElementProps {
  props: TooltipProps;
  content: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onElementLoaded: (elementProps: ElementProps) => void,
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Tooltip: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NanoTooltip
      title={elementProps['value'] != null ? elementProps['value'] : ''}
      {...elementProps}
      {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)[0]}
    </NanoTooltip>
  );
};

export default Tooltip;
