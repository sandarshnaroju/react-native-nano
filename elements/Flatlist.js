import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UniversalElement from './UniversalElement';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
