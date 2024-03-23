import React, {useEffect} from 'react';
import {Searchbar as PaperSearchBar, SearchbarProps} from 'react-native-paper';
interface ElementProps {
  props: SearchbarProps;
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
const SearchBar: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperSearchBar
      {...elementProps['props']}
      value={elementProps['value']}
      {...elementProps}
    />
  );
};

export default SearchBar;
