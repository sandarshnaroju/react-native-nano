import React, {useContext, useState} from 'react';
import {Appearance} from 'react-native';
export const Context = React.createContext('DEFAULT');

export function GetContextProvider() {
  return useContext(Context);
}

function ContextProvider(props) {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() == 'dark');
  const [themeString, setThemeString] = useState(null);

  const setTheme = themeName => {
    setThemeString(themeName);
  };
  const listener = () => {
    const theme = Appearance.getColorScheme();

    setIsDark(theme == 'dark' ? true : false);
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
