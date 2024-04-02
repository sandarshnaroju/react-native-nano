import Animated from 'react-native-reanimated';
import {useReanimationHook} from '../hooks/UseReanimationHook';
import React from 'react';
import UniversalElement from './UniversalElement';
import {
  executeAFunction,
  getInterceptedFunctionProps,
  replaceValuesInItemViewObjectsAsperDataGiven,
} from '../utils/Utilities';
interface ReanimatedFlatlistProps {
  data: any[];
  itemView: any;
  mapper?: Function;
  // navigation: any;
  // onPress: () => void;
  // keyExtractor: Function;
  // extraItemviewProps: any;
  // props: any;
  themes: any;
  propParameters: any;
  getUi: any;
  onPressCallBack: () => void;
  // unModifiedElemOb: any;
  uniqueKey: Function;
  context: any;
  logicObject: any;
  packages;
  elementProps: any;
}
const ReanimatedFlatlist: React.FC<ReanimatedFlatlistProps> = ({
  data,
  itemView,
  mapper,
  // navigation,
  // onPress,
  // keyExtractor,
  // extraItemviewProps,
  // props,
  themes,
  propParameters,
  getUi,
  onPressCallBack,
  // unModifiedElemOb,
  uniqueKey,
  context,
  logicObject,
  elementProps,
  packages,
}) => {
  let [animatedStylesNewRef, animatedPropsRef] = useReanimationHook({
    elementProps,
  });
  const renderItem = ({item, index}: {item: any; index: number}) => {
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
      itemData: item,
      listData: data,
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
      // onPressCallBack: onPressCallBack,
    });

    return (
      <UniversalElement
        key={uniq + index}
        // elemObj={funProps}
        // navigation={navigation}
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
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={eachdata => {
        return executeAFunction(uniqueKey, eachdata);
      }}
      style={[animatedStylesNewRef.current]}
      animatedProps={animatedPropsRef}
      {...elementProps}
    />
  );
};
export default ReanimatedFlatlist;
