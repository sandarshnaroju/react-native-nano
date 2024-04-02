import isEqual from 'lodash/isEqual';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {
  executeAFunction,
  isFunction,
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
interface RecycleTestComponentProps {
  onElementLoaded: Function;
  getUi: any;
  onPressCallBack: () => void;
  unModifiedElemOb: any;
  propParameters: any;
  listData: any[];
  logicObject: any;
  uniqueKey: Function;
  themes: any;
  context: any;
  itemWidth?: number;
  itemHeight?: number;
  mapper?: (arg: any) => {};
  itemView: any;
  props: any;
  packages;
  animateUi;
}
interface RecycleTestComponentState {
  dataProvider: DataProvider;
}

const getInterceptedFunctionProps = ({eleObject, props, onPressCallBack}) => {
  const funArray = {};
  Object.keys(eleObject)
    .filter(propKey => propKey.indexOf('on') == 0)
    .forEach(propKey => {
      funArray[propKey] = withExtraParams(
        eleObject[propKey],
        props,
        onPressCallBack,
      );
    });

  return funArray;
};
class RecycleTestComponent extends React.Component<
  RecycleTestComponentProps,
  RecycleTestComponentState
> {
  totalHeight: number;
  totalWidth: number;
  _layoutProvider: LayoutProvider;
  // _rowRenderer: (type: string, data: any, index: number) => JSX.Element | null;

  constructor(props: RecycleTestComponentProps) {
    super(props);

    const {width, height} = Dimensions.get('window');
    this.totalHeight = height;
    this.totalWidth = width;

    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      () => ViewTypes.FULL,
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

    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.listData),
    };
  }

  componentDidUpdate(prevProps: RecycleTestComponentProps) {
    if (prevProps.listData !== this.props.listData) {
      const dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
      });
      this.setState({
        dataProvider: dataProvider.cloneWithRows(this.props.listData),
      });
    }
  }

  componentDidMount() {
    this.props.onElementLoaded({
      getUi: this.props.getUi,
      onPressCallBack: this.props.onPressCallBack,
      loadedElemObject: this.props.unModifiedElemOb,
      propParameters: this.props.propParameters,
    });
  }

  _rowRenderer(type: number, data: any, index: number): JSX.Element | null {
    switch (type) {
      case ViewTypes.FULL:
        const mapper = executeAFunction(this.props.mapper, data);

        const modifiedContent = replaceValuesInItemViewObjectsAsperDataGiven(
          this.props.itemView['content'],
          mapper,
        );

        const uniq = executeAFunction(this.props.uniqueKey, data);

        const elemOb = {
          ...this.props.itemView,
          value: mapper['value'],
          content: modifiedContent,
        };
        const componentParams = {
          index,
          itemData: data,
          listData: this.props.listData,
        };
        const funProps = getInterceptedFunctionProps({
          eleObject: elemOb,
          props: {
            logicObject: this.props.logicObject,
            moduleParams: {
              ...this.props.propParameters,
              theme: this.props.context,
            },
            componentParams: componentParams,
            getUi: this.props.getUi,
            setUi: this.props.onPressCallBack,
          },
          onPressCallBack: this.props.onPressCallBack,
        });

        return (
          <UniversalElement
            key={uniq + index}
            uniqueKey={uniq + index}
            // elemObj={elemOb}
            // navigation={this.props.navigation}
            unModifiedElemOb={elemOb}
            onPressCallBack={this.props.onPressCallBack}
            propParameters={this.props.propParameters}
            recyclerListViewFunctionProps={funProps}
            // logicObject={this.props.logicObject}
            // listData={this.props.listData}
            // item={data}
            // listViewIndex={index}
            themes={this.props.themes}
            getUi={this.props.getUi}
            context={this.props.context}
            componentParams={componentParams}
            packages={this.props.packages}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const viewStyle = this.props?.props?.containerStyle ?? {};

    const recyclerProps = getInterceptedFunctionProps({
      eleObject: this.props,
      props: {
        moduleParams: {
          ...this.props.propParameters,
          theme: this.props.context,
        },
        componentParams: {
          listData: this.props.listData,
        },
        getUi: this.props.getUi,
        setUi: this.props.onPressCallBack,
        animateUi: this.props.animateUi,
      },
      onPressCallBack: this.props.onPressCallBack,
    });

    return (
      <View
        style={[
          {height: this.totalHeight, width: this.totalWidth},
          {...viewStyle},
        ]}>
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
          {...this.props.props}
          {...recyclerProps}
          extendedState={
            this.props.context != null ? JSON.parse(this.props.context) : null
          }
        />
      </View>
    );
  }
}
export default RecycleTestComponent;
