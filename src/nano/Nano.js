import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
const getFilteredScreenObject = entireScreenObject => {
  const filterElements = {};
  if (entireScreenObject != null) {
    Object.entries(entireScreenObject).forEach(keyValueArr => {
      filterElements[keyValueArr[0]] = keyValueArr[1].filter(
        elem => elem['canChangeEffect'] !== false,
      );
    });
  }

  return filterElements;
};

export const Nano = ({screen, style, navigation, scroll, logicObject}) => {
  const [uiElements, setUiElements] = useState(screen);

  const filteredElements = getFilteredScreenObject(uiElements);
  const getRowElements = (rowElementsArray, rowKey) => {
    const rowelements = [];
    if (rowElementsArray != null && rowElementsArray.length > 0) {
      rowElementsArray.forEach((eleObject, index) => {
        rowelements.push(
          <CheckForListviewAndRender
            key={index + Math.random()}
            elemOb={eleObject}
            navigation={navigation}
            onPress={(index, item, completeFlatlistData) => {
              // console.log('sssss');
              setUiElements(
                logicObject[eleObject['onClick']]({
                  navigation,
                  uiElements,
                  index,
                  item,
                  completeFlatlistData,
                }),
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

  useEffect(() => {
    if (screen != null && screen['url']) {
      fetch(screen['url'])
        .then(response => response.json())
        .then(response => {
          setUiElements(JSON.parse(response['data']['code']));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);
  if (scroll) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={style}>
        {getColoumViews(uiElements)}
      </ScrollView>
    );
  }
  return <View style={style}>{getColoumViews(uiElements)}</View>;
};
