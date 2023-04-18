import {isFunction} from 'lodash';
import React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {
  executeAFunction,
  replaceValuesInItemViewObjectsAsperDataGiven,
} from '../utils/Utilities';
import UniversalElement from './UniversalElement';

function NanoFlatlist({
  data,
  itemView,
  mapper,
  navigation,
  onPress,
  keyExtractor,
  extraItemviewProps,
  props,
}) {
  const renderItem = ({item, index}) => {
    let mapperResult = null;
    if (mapper) {
      mapperResult = executeAFunction(mapper, item);
    }

    const modifiedContent = replaceValuesInItemViewObjectsAsperDataGiven(
      itemView['content'],
      mapperResult,
    );

    return (
      <UniversalElement
        elemObj={{
          component: itemView['component'],
          value: mapperResult['value'],
          props: itemView['props'],
          content: modifiedContent,
          onClick: itemView['onClick'],
        }}
        navigation={navigation}
        onPress={() => onPress(index, item, data)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={eachdata => {
          return executeAFunction(keyExtractor, eachdata);
        }}
      />
    </SafeAreaView>
  );
}

export default NanoFlatlist;
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});
