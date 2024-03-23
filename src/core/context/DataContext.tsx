import React, {useContext, useRef, useState} from 'react';
import {Appearance} from 'react-native';
export const Context = React.createContext('DEFAULT');

export function GetContextProvider() {
  return useContext(Context);
}
interface Theme {
  name: string;
  isDark: boolean;
}

interface ContextProviderProps {
  themes: Theme[];
  children: React.ReactNode;
}
const ContextProvider: React.FC<ContextProviderProps> = props => {
  const isInitialSystemDark =
    Appearance.getColorScheme() == 'dark' ? true : false;

  const themesRef = useRef<Theme[]>(props.themes);
  const initialThemObj =
    themesRef.current != null && themesRef.current.length > 0
      ? themesRef.current.find(themeObj => {
          return themeObj['isDark'] == isInitialSystemDark;
        })
      : null;

  const themeStringRef = useRef<string | null>(
    initialThemObj != null && initialThemObj['name'] != null
      ? initialThemObj['name']
      : null,
  );
  const [isDark, setIsDark] = useState<boolean>(isInitialSystemDark);

  const [themeString, setThemeString] = useState<string | null>(
    themeStringRef.current,
  );
  const setTheme = (themeName: string) => {
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
};

export default ContextProvider;
