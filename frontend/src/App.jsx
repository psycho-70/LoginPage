import React, { useContext } from 'react';
import { DarkModeContext } from './appContext'; // Import the context
import Navbar from './components/Navbar';
import Loginform from "./components/Loginform";
import Dashboard from './components/Deshbord';
import Login from './components/login'; // Import the Login component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { darkMode } = useContext(DarkModeContext); // Access dark mode state

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Loginform />} />

          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
