import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import {
  TextField, Button, Typography, Grid, Link as MuiLink, Box, Checkbox, FormControlLabel, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from 'notistack'; // Import Notistack for notifications
import { DarkModeContext, UserContext } from '../appContext'; // Adjust import path as necessary

function LoginPage() {
  const { darkMode } = useContext(DarkModeContext);
  const { fetchUserData } = useContext(UserContext); // Get fetchUserData from UserContext

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Notistack hook for notifications
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar('Please enter a valid email address!', { variant: 'error' });
      return;
    }

    // Password validation
    if (password.length < 8) {
      enqueueSnackbar('Password must be at least 8 characters long!', { variant: 'error' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName, address }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      enqueueSnackbar('Login successful!', { variant: 'success' }); // Show success notification

      // Store the token (if provided) in localStorage
      localStorage.setItem('token', data.token);
      fetchUserData(); // Fetch user data immediately after login

      // Clear the form fields after submission
      setEmail('');
      setPassword('');
      setFullName('');
      setAddress('');

      // Redirect to dashboard after successful login
      navigate('/dashboard', { state: { email, fullName, address } });

    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Login failed! Please check your credentials and try again.', { variant: 'error' }); // Show error notification
    }
  };

  return (
    <div className={`  flex justify-around -space-x-16  py-5 bg-${darkMode ? 'black' : 'gray-100'} transition-colors duration-3000`}>
      <div className={`  w-full max-w-md  p-6 rounded-lg shadow-md bg-${darkMode ? 'black' : 'gray-200'} text-${darkMode ? 'gray-100' : 'gray-900'}`}>
        <Typography variant="h4" align="center" mb={2}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" align="center" mb={2}>
          Enter to get unlimited access to data & information.
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-3">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
          </div>

          <div className="mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
          </div>

          <div className="mb-4">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#fff' : '#000',
                  },
                },
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: darkMode ? '#fff' : '#000' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              InputLabelProps={{
                sx: {
                  color: darkMode ? '#fff' : '#000',
                },
              }}
            />
          </div>

          <FormControlLabel
            control={<Checkbox sx={{ color: darkMode ? '#fff' : '#000' }} />}
            label="Remember me"
            sx={{ color: darkMode ? '#f7f4f3' : '#000' }}
          />

          <div className="text-right">
            <Typography variant="body2" component={Link} to="/forgot-password" sx={{ color: darkMode ? '#90caf9' : '#1e88e5' }}>
              Forgot your password?
            </Typography>
          </div>
<div className='flex justify-end p-2'>

          <Button
            type="submit"
            variant="contained"
           color='secondary'
          >
            Log In
          </Button>
</div>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2, mb: 3, color: darkMode ? '#bb86fc' : '#6200ea', borderColor: darkMode ? '#bb86fc' : '#6200ea' }}
            onClick={() => {
              // Handle Google Sign-In logic here
            }}
          >
            Sign Up with Google
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Typography component={Link} to="/login" variant="body2" underline="none" sx={{ color: darkMode ? '#90caf9' : '#1e88e5' }}>
            Register here
          </Typography>
        </Typography>
      </div>

      <div className="hidden  lg:block ml-10">
        <img src="./center.png" width={600} height={600} alt="Login illustration" />
      </div>
    </div>
  );
}

export default LoginPage;
