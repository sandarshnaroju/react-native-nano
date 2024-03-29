import React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {
  executeAFunction,
  getInterceptedFunctionProps,
  replaceValuesInItemViewObjectsAsperDataGiven,
} from '../utils/Utilities';
import UniversalElement from './UniversalElement';
interface Item {}

interface NanoFlatlistProps {
  data: Item[];
  itemView: any;
  mapper?: Function;
  navigation: any;
  onPress: () => void;
  keyExtractor: (item: Item, index: number) => string;
  extraItemviewProps: any;
  props: any;
  themes: any;
  propParameters: any;
  getUi: any;
  onPressCallBack: () => void;
  unModifiedElemOb: any;
  uniqueKey: (item: Item) => string;
  context: any;
  logicObject: any;
  packages;
}

const NanoFlatlist: React.FC<NanoFlatlistProps> = ({
  data,
  itemView,
  mapper,
  navigation,
  onPress,
  keyExtractor,
  extraItemviewProps,
  props,
  themes,
  propParameters,
  getUi,
  onPressCallBack,
  unModifiedElemOb,
  uniqueKey,
  context,
  logicObject,
  packages,
}) => {
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

    const uniq = executeAFunction(uniqueKey, item);
    const componentParams = {
      index,
      itemData: data,
      listData: this.props.listData,
    };
    const funProps = getInterceptedFunctionProps({
      eleObject: elemOb,
      props: {
        logicObject: logicObject,
        moduleParams: {
          ...propParameters,
          theme: context,
        },
        componentParams: componentParams,
        getUi: getUi,
        setUi: onPressCallBack,
      },
      onPressCallBack: onPressCallBack,
    });

    return (
      <UniversalElement
        key={uniq + index}
        elemObj={funProps}
        navigation={navigation}
        getUi={getUi}
        onPressCallBack={onPressCallBack}
        propParameters={propParameters}
        recyclerListViewFunctionProps={funProps}
        themes={themes}
        unModifiedElemOb={elemOb}
        uniqueKey={uniq + index}
        context={context}
        componentParams={componentParams}
        packages={packages}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={eachdata => {
          return executeAFunction(uniqueKey, eachdata);
        }}
      />
    </SafeAreaView>
  );
};

export default NanoFlatlist;
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});
