import React, {useState, useEffect} from 'react';

export const getNanoTheme = props => {
  const [isDark, setIsDark] = useState(null);
  const [theme, setTheme] = useState(null);

  useEffect(() => {});

  const dark = () => {
    setIsDark(true);
    setTheme('dark');
  };
  const light = () => {
    setIsDark(false);
    setTheme('light');
  };
  const setCustomTheme = customThemeName => {
    setTheme(customThemeName);
  };
  return [isDark, dark, light, setCustomTheme, theme];
};
