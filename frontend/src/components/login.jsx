import React, { useState, useContext } from 'react';
import { TextField, Typography, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DarkModeContext, UserContext } from '../appContext';
import { useNavigate } from 'react-router-dom'; // For navigation
import { SnackbarProvider, enqueueSnackbar } from 'notistack'; // For notifications
import { Link } from 'react-router-dom';

const Login = () => {
  const { darkMode } = useContext(DarkModeContext); // Get darkMode from the context
  const [email, setEmail] = useState('');
  const { fetchUserData } = useContext(UserContext); // Access fetchUserData to update user data on login
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation pattern
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format
    if (!validateEmail(email)) {
      enqueueSnackbar('Please enter a valid email address.', { variant: 'error' });
      return;
    }

    // Clear the error if validation passes
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Using the correct 'email' variable
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem('token', data.token);

        // Notify the user of successful login
        enqueueSnackbar('Login successful!', { variant: 'success' });

        // Immediately fetch user data after successful login
        fetchUserData();
        // Navigate to the dashboard after successful login
        navigate('/dashboard');
      } else {
        // Handle incorrect email or password
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      enqueueSnackbar('An error occurred during login', { variant: 'error' });
    }
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <section>
        <div className={`flex flex-wrap justify-around -space-x-16 py-5 bg-${darkMode ? 'black' : 'gray-100'} transition-colors duration-300`}>
          <div className={` md:w-1/3 w-full h-[70vh] md:h-[80vh] p-5 shadow-lg rounded-lg ${darkMode ? 'black' : 'bg-white'}`}>
            <Typography variant="h4" align="center" mb={3} sx={{ color: darkMode ? '#fff' : '#000' }}>
              Welcome Back!
            </Typography>
            <Typography variant="body2" align="center" mb={3} sx={{ color: darkMode ? '#fff' : '#000' }}>
              Experience endless opportunities for data and knowledge at your fingertips.
            </Typography>

            {/* Error message */}
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
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
                margin="normal"
              />

              {/* Password Field */}
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
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

              {/* Submit Button */}
              <div className=' flex items-end justify-end'>

                <Button
                  type="submit"
                  variant="contained"
                  color='secondary'
                  sx={{
                    marginTop: '20px',

                    color: '#fff',
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className='flex     py-5'>
              <p className=''>
                <span className='text-red-500'>
                  <Button
                    component={Link}
                    to="/loginform" // Adjust this path if needed
                  >
                    Create a New Account
                  </Button>
                </span>
                Begin your journey with us today.

              </p>

            </div>
          </div>

          {/* Image on the side */}
          <aside className=" hidden md:block md:w-1/3 w-full">
            <img src="./login.png" alt="Login illustration" className="md:w-[600px] w-[300px] md:h-[400px]" />
          </aside>
        </div>
      </section>
    </SnackbarProvider>
  );
};

export default Login;
