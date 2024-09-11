import React, { useState, useContext } from 'react';
import { TextField, Typography, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DarkModeContext, UserContext } from '../appContext';
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
  const { darkMode } = useContext(DarkModeContext); // Get darkMode from the context
  const [address, setAddress] = useState('');
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
    if (!validateEmail(address)) {
      setError('Please enter a valid email address.');
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
          email: address,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem('token', data.token);
        // Navigate to the dashboard after successful login
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <section>
      <div className="flex flex-wrap justify-around" >
        <div className={` w-full md:w-1/3 bg-red-500  ${ darkMode ? 'bg-black' : 'bg-light text-black'}`}>
          <Typography variant="h4" align="center" mb={3} sx={{ color: darkMode ? '#fff' : '#000' }}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" align="center" mb={3} sx={{ color: darkMode ? '#fff' : '#000' }}>
            Enter to get unlimited access to data & information.
          </Typography>

          {/* Error message */}
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email/Address Field */}
            <TextField
              label="Email"
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: '20px',
                backgroundColor: darkMode ? '#333' : '#000',
                color: '#fff',
              }}
            >
              Login
            </Button>
          </form>
        </div>

        {/* Image on the side */}
        <aside  className=' md:w-1/3 bg-black w-full  '>
          <img src="./login.png" alt="Login illustration" className='md:w-[600px] w-[300px] md:h-[500px] ' />
        </aside>
      </div>
    </section>
  );
};

export default Login;
