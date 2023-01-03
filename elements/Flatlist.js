import React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import UniversalElement from './UniversalElement';

function NanoFlatlist({data, itemview, mapper, navigation, onPress}) {
  const renderItem = ({item}) => {
    const mapperResult = mapper(data);
    return (
      <UniversalElement
        elemObj={{
          component: itemview['component'],

          value: mapperResult['value'],
          props: itemview['props'],
          content: itemview['content'],
        }}
        navigation={navigation}
        onPress={onPress}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
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
