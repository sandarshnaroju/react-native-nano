import {cloneDeep, isFunction} from 'lodash';
import isEqual from 'lodash/isEqual';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {
  executeAFunction,
  modifyElemObjAsPerTheme,
  nameShortcutObject,
  replaceValuesInItemViewObjectsAsperDataGiven,
} from '../utils/Utilities';
import UniversalElement from './UniversalElement';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

/***
 * To test out just copy this component and render in you root component
 */
const withExtraParams = (originalFn, extraParams, onPressCallBack) => {
  return function (...args) {
    const newArgs = {
      methodValues: args,
      ...extraParams,
    };
    executeAFunction(originalFn, newArgs);
  };
};
const getInterceptedFunctionProps = ({eleObject, props, onPressCallBack}) => {
  const funArray = {};
  Object.keys(eleObject)
    .filter(propKey => propKey.indexOf('on') === 0)
    .forEach(propKey => {
      funArray[propKey] = withExtraParams(
        eleObject[propKey],
        props,
        onPressCallBack,
      );
    });

  return funArray;
};
export default class RecycleTestComponent extends React.Component {
  constructor(args) {
    super(args);

    let {width, height} = Dimensions.get('window');
    this.totalHeight = height;
    this.totalWidth = width;

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    //Create the layout provider
    //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
    //If you need data based check you can access your data provider here
    //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.FULL:
            dim.width = this.props.itemWidth ? this.props.itemWidth : width;
            dim.height = this.props.itemHeight ? this.props.itemHeight : 50;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    // console.log('list data', this.props.listData);
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.listData),
    };
  }

  componentDidUpdate(prevProps, prevStates) {
    if (!isEqual(prevProps['listData'], this.props['listData'])) {
      let dataProvider = new DataProvider((r1, r2) => {
        return !isEqual(r1, r2);
      });
      this.setState({
        dataProvider: dataProvider.cloneWithRows(this.props.listData),
      });
    }
  }

  //Given type and data return the view component
  _rowRenderer(type, data, index) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.FULL:
        let mapper = null;
        if (this.props && this.props.mapper) {
          mapper = executeAFunction(this.props.mapper, data);
        }

        // ! mapper takes value of data supplied to listview one by one and returns an object with name of the element as key and value as the required value to be set to the element.
        // console.log('mapper', mapper);

        const modifiedContent = replaceValuesInItemViewObjectsAsperDataGiven(
          this.props.itemView['content'],
          mapper,
        );
        // console.log(
        //   '🚀 ~ file: RecyclerlistView.js:120 ~ RecycleTestComponent ~ _rowRenderer ~ modifiedContent:',
        //   modifiedContent,
        // );
        const uniq = executeAFunction(this.props.uniqueKey, data);
        const elemOb = {
          ...this.props.itemView,
          // component: this.props.itemView['component'],

          value: mapper['value'],
          // props: this.props.itemView['props'],
          content: modifiedContent,
          // onPress: this.props.itemView['onPress'],
        };
        // console.log('inside listrecyceler', this.props.itemView['onPress']);

        // const originalObj = cloneDeep(this.props.unModifiedElemOb);
        // let elemObjAfterThemesSet = originalObj;

        // if (this.props.themes != null && this.props.themes.length > 0) {
        //   elemObjAfterThemesSet = modifyElemObjAsPerTheme(
        //     originalObj,
        //     this.props.themes,
        //     this.props.context,
        //   );
        // }

        const funProps = getInterceptedFunctionProps({
          eleObject: elemOb,
          props: {
            logicObject: this.props.logicObject,
            moduleParams: this.props.propParameters,
            componentParams: {
              index,
              itemData: data,
              listData: this.props.listData,
            },
            getUi: this.props.getUi,
            setUi: this.props.onPressCallBack,
          },
          onPressCallBack: this.props.onPressCallBack,
        });

        return (
          <UniversalElement
            key={uniq + index}
            uniqueKey={uniq + index}
            elemObj={elemOb}
            navigation={this.props.navigation}
            // onPress={({itemJson}) => {
            //   this.props.onPress({
            //     index,
            //     itemData: data,
            //     listData: this.props.listData,
            //     itemJson,
            //   });
            // }}
            unModifiedElemOb={elemOb}
            onPressCallBack={this.props.onPressCallBack}
            propParameters={this.props.propParameters}
            recyclerListViewFunctionProps={funProps}
            logicObject={this.props.logicObject}
            listData={this.props.listData}
            item={data}
            listViewIndex={index}
            themes={this.props.themes}
            customComponents={this.props.customComponents}
            getUi={this.props.getUi}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const viewStyle =
      this.props != null &&
      this.props.props != null &&
      this.props.props.containerStyle != null
        ? this.props.props.containerStyle
        : {};

    const recyclerProps = getInterceptedFunctionProps({
      eleObject: this.props,
      props: {
        ...this.props.propParameters,
        setUi: this.props.onPressCallBack,
      },
      onPressCallBack: this.props.onPressCallBack,
    });

    // if (this.props != null && this.props['name'] != null) {
    //   // console.log('inside');

    //   nameShortcutObject[this.props['name']] = [];
    // }

    return (
      <View
        style={[
          {height: this.totalHeight, width: this.totalWidth},
          {
            ...viewStyle,
          },
        ]}>
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
          {...this.props.props}
          {...recyclerProps}
          extendedState={this.props.context}
        />
      </View>
    );
  }
}
const styles = {};
