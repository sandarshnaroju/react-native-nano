import React, {useContext, useRef, useState} from 'react';
import {Appearance} from 'react-native';
export const Context = React.createContext('DEFAULT');

export function GetContextProvider() {
  return useContext(Context);
}

function ContextProvider(props) {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() == 'dark');
  const themeStringRef = useRef(null);
  const [themeString, setThemeString] = useState(themeStringRef.current);
  const themesRef = useRef(props.themes);

  const setTheme = themeName => {
    themeStringRef.current = themeName;
    setThemeString(themeStringRef.current);
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
