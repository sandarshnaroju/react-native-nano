import React from 'react';
import {View} from 'react-native-animatable';
import UniversalElement from './UniversalElement';
function Mapper({screen, onDataChange}) {
  const getRowElements = (rowElementsArray, rowKey) => {
    const rowelements = [];
    if (rowElementsArray != null && rowElementsArray.length > 0) {
      rowElementsArray.forEach((eleObject, index) => {
        rowelements.push(
          <UniversalElement
            key={index + 'ss'}
            elemObj={eleObject}
            onPress={() => {
              onDataChange(eleObject['onClick'](screen, rowKey, index));
            }}
          />,
        );
      });
    }
    return rowelements;
  };
  const getColoumViews = totalData => {
    const elements = [];
    if (totalData != null) {
      Object.keys(totalData).forEach((key, index) => {
        if (key != null && key.slice(0, 1) === 'h') {
          elements.push(
            <View style={{flexDirection: 'row'}} key={key + index + 1}>
              {getRowElements(totalData[key], key)}
            </View>,
          );
        } else if (key != null && key.slice(0, 1) === 'v') {
          elements.push(getRowElements(totalData[key], key));
        }
      });
    }

    return elements;
  };

  return <View style={{flex: 1}}>{getColoumViews(screen)}</View>;
}

export default Mapper;
