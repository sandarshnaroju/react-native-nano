import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import CheckForListviewAndRender from './elements/CheckForListviewAndRender';
const getFilteredScreenObject = entireScreenObject => {
  const filterElements = {};

  Object.entries(entireScreenObject).forEach(keyValueArr => {
    filterElements[keyValueArr[0]] = keyValueArr[1].filter(
      elem => elem['canChangeEffect'] !== false,
    );
  });

  return filterElements;
};
export const Nano = ({screen, style, navigation, scroll}) => {
  const [uiElements, setUiElements] = useState(screen);
  const filteredElements = getFilteredScreenObject(screen);
  const getRowElements = (rowElementsArray, rowKey) => {
    const rowelements = [];
    if (rowElementsArray != null && rowElementsArray.length > 0) {
      rowElementsArray.forEach((eleObject, index) => {
        rowelements.push(
          <CheckForListviewAndRender
            key={index + 'ss'}
            elemOb={eleObject}
            navigation={navigation}
            onPress={() => {
              eleObject['onClick'](
                navigation,
                filteredElements,
                eleObject['value'],
              );
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
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'black',
                justifyContent: 'space-between',
              }}
              key={key + index + 1}>
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

  useEffect(() => {
    setUiElements(screen);
  }, [screen]);
  if (scroll) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={style}>
        {getColoumViews(uiElements)}
      </ScrollView>
    );
  }
  return <View style={style}>{getColoumViews(uiElements)}</View>;
};
