import React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {replaceValuesInItemViewObjectsAsperDataGiven} from '../utils/Utilities';
import UniversalElement from './UniversalElement';

function NanoFlatlist({
  data,
  itemview,
  mapper,
  navigation,
  onPress,
  extraItemviewProps,
}) {
  const renderItem = ({item, index}) => {
    const mapperResult = mapper(item, index);
    const modifiedContent = replaceValuesInItemViewObjectsAsperDataGiven(
      itemview['content'],
      mapperResult,
    );

    return (
      <UniversalElement
        elemObj={{
          component: itemview['component'],

          props: itemview['props'],
          content: modifiedContent,
          onClick: itemview['onClick'],
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
        keyExtractor={item => item.name}
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
