import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const colors = {
    isDarkMode,
    bg: isDarkMode ? '#1a202c' : '#f0f4f8',
    card: isDarkMode ? '#2d3748' : '#fff',
    text: isDarkMode ? '#f7fafc' : '#1a365d',
    subtext: isDarkMode ? '#a0aec0' : '#718096',
    inputBg: isDarkMode ? '#4a5568' : '#f7fafc',
    inputBorder: isDarkMode ? '#718096' : '#e2e8f0',
    button: isDarkMode ? '#4a5568' : '#e2e8f0',
    buttonText: isDarkMode ? '#cbd5e0' : '#4a5568',
  };

  return (
    <ThemeContext.Provider value={{ colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);