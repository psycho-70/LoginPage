import React, { createContext, useEffect, useState } from 'react';

// Create the contexts
export const DarkModeContext = createContext(); 
export const UserContext = createContext();

// Create a provider component for DarkMode
export const DarkModeProvider = ({ children }) => {
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

// Create a provider component for User data
export const UserProvider = ({ children }) => {
  const [userDataform, setUserDataform] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the JWT token to the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserDataform(data); // Update user data state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userDataform, loading }}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </UserContext.Provider>
  );
};
