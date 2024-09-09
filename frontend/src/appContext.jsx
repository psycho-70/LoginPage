import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const DarkModeContext = createContext(); // Renamed to avoid conflict with state

// Create a provider component
export const DarkModeProvider = ({ children }) => { // Rename Provider to be clear
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply or remove the 'dark' class to body based on darkMode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
