import React, {useContext, useRef, useState} from 'react';
import {Appearance} from 'react-native';
export const Context = React.createContext('DEFAULT');

export function GetContextProvider() {
  return useContext(Context);
}

function ContextProvider(props) {
  const themesRef = useRef(props.themes);
  const themeStringRef = useRef(
    themesRef.current != null && themesRef.current.length > 0
      ? themesRef.current[0]['name']
      : null,
  );
  const [isDark, setIsDark] = useState(
    themesRef.current != null && themesRef.current.length > 0
      ? themesRef.current[0]['isDark']
      : null,
  );

  const [themeString, setThemeString] = useState(themeStringRef.current);
  const setTheme = themeName => {
    if (themesRef.current != null && themesRef.current.length > 0) {
      const selectedThemObj = themesRef.current.find(themeObj => {
        return themeObj['name'] == themeName;
      });
      setIsDark(selectedThemObj['isDark']);
      themeStringRef.current = themeName;
      setThemeString(themeStringRef.current);
    }
  };
  const listener = () => {
    const theme = Appearance.getColorScheme();
    const isDarkTh = theme == 'dark' ? true : false;
    setIsDark(isDarkTh);
    if (themesRef.current != null && themesRef.current.length > 0) {
      const selectedThemObj = themesRef.current.find(themeObj => {
        return themeObj['isDark'] == isDarkTh;
      });
      themeStringRef.current = selectedThemObj['name'];
      setThemeString(themeStringRef.current);
    }
  };

  React.useEffect(() => {
    const themeListener = Appearance.addChangeListener(listener);

    return () => {
      themeListener.remove();
    };
  }, []);

  return (
    <Context.Provider
      value={{
        isDark,
        theme: themeString,

        setTheme,
      }}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
