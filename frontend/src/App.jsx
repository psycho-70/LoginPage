import React, { useContext } from 'react';
import { DarkModeContext } from './appContext'; // Import the context
import Navbar from './components/Navbar';
import Loginform from './components/Loginform';
import Dashboard from './components/Deshbord';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Utility function to check if the user is logged in
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
};

function App() {
  const { darkMode } = useContext(DarkModeContext); // Access dark mode state

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <Navbar />
        <Routes>
          {/* If user is authenticated, redirect from / to /dashboard */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Loginform />} 
          />

          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginform" element={<Loginform />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
