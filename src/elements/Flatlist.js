import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import {
  executeAFunction, replaceValuesInItemViewObjectsAsperDataGiven
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
  customComponents,
  themes,
  propParameters,
  getUi,
  onPressCallBack,
  unModifiedElemOb,
  uniqueKey,
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
    const elemOb = {
      ...itemView,

      value: mapper['value'],
      content: modifiedContent,
    };
    const uniq = executeAFunction(uniqueKey, data);

   
    return (
      <UniversalElement
        elemObj={elemOb}
        navigation={navigation}
        customComponents={customComponents}
        getUi={getUi}
        onPressCallBack={onPressCallBack}
        propParameters={propParameters}
        recyclerListViewFunctionProps={null}
        themes={themes}
        unModifiedElemOb={unModifiedElemOb}
        uniqueKey={uniq + index}
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
