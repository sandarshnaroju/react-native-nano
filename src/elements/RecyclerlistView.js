import isEqual from 'lodash/isEqual';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {replaceValuesInItemViewObjectsAsperDataGiven} from '../utils/Utilities';
import UniversalElement from './UniversalElement';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

/***
 * To test out just copy this component and render in you root component
 */

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
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.listdata),
    };
  }

  componentDidUpdate(prevProps, prevStates) {
    if (!isEqual(prevProps['listdata'], this.props['listdata'])) {
      let dataProvider = new DataProvider((r1, r2) => {
        return !isEqual(r1, r2);
      });
      this.setState({
        dataProvider: dataProvider.cloneWithRows(this.props.listdata),
      });
    }
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.FULL:
        const mapper = this.props.mapper(data);

        const modifiedContent = replaceValuesInItemViewObjectsAsperDataGiven(
          this.props.itemview['content'],
          mapper,
        );
        return (
          <UniversalElement
            elemObj={{
              component: this.props.itemview['component'],

              value: mapper['value'],
              props: this.props.itemview['props'],
              content: modifiedContent,
              onClick: this.props.itemview['onClick'],
            }}
            navigation={this.props.navigation}
            onPress={() => {
              // console.log('onpress', data);

              this.props.onPress(mapper['value'], data, this.props.listdata);
            }}
          />
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <View style={{height: this.totalHeight, width: this.totalWidth}}>
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
        />
      </View>
    );
  }
}
const styles = {};
