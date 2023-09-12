import React, {useEffect} from 'react';
import {Searchbar as PaperSearchBar} from 'react-native-paper';
function SearchBar({elementProps, getViewItems, onElementLoaded}) {
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
}

export default SearchBar;
