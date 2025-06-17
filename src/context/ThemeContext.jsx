import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#00f0ff'); // Neon blue default

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAccent = localStorage.getItem('accentColor') || '#00f0ff';
    setTheme(savedTheme);
    setAccentColor(savedAccent);
    document.documentElement.style.setProperty('--accent-color', savedAccent);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
    document.documentElement.style.setProperty('--accent-color', color);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);