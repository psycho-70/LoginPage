import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './appContext'; // Import the UserProvider which wraps the DarkModeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Wrap the entire app with UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
);
