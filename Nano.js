import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import CheckForListviewAndRender from './elements/CheckForListviewAndRender';
const getFilteredScreenObject = entireScreenObject => {
  const filterElements = {};

  // Object.entries(entireScreenObject).forEach(keyValueArr => {
  //   filterElements[keyValueArr[0]] = keyValueArr[1].filter(
  //     elem => elem['canChangeEffect'] !== false,
  //   );
  // });

  return filterElements;
};

export const Nano = ({screen, style, navigation, scroll, logicObject}) => {
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
              // const fn = new Function(eleObject['onClick'])();
              // fn(navigation, filteredElements, eleObject['value']);
              // logicObject[eleObject['onClick']](
              //   navigation,
              //   filteredElements,
              //   eleObject['value'],
              // );
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
          // console.log('screeen', totalData['props']);

          elements.push(
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
              }}
              // {...totalData['props']}
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
  const checkbox = {
    value: true,
    props: {
      style: {},
    },

    onClick:
      "'navigation','elements','value','console.log('clicked it worked') return elements'",
    onLongClick: elements => {},
  };
  useEffect(() => {
    if (screen != null && screen['url']) {
      fetch(screen['url'])
        .then(response => response.json())
        .then(response => {
          // const ss = JSON.stringify(checkbox);
          // const ls = JSON.parse(ss);
          // console.log('ssss0', ls);
          // const ffff = Function(ls['onClick']);
          // ffff();
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
