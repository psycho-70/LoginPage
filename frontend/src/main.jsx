import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './appContext'; // Import the UserProvider which wraps the DarkModeProvider
import { SnackbarProvider, useSnackbar } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
    <UserProvider> {/* Wrap the entire app with UserProvider */}
      <App />
    </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
