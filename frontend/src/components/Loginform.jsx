import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DarkModeContext } from '../appContext'; // Adjust import path as necessary

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
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

      // Optionally, redirect the user to a protected route or home page
    } catch (error) {
      console.error('Error:', error);
      // Handle login errors here (e.g., display an error message)
    }
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: darkMode ? '#121212' : '#f7f4f3',
        transition: 'background-color 0.3s',
        padding:"10px"
      }}
    >
      <Grid
        item
        xs={12}
        md={4}
        p={3}
        sx={{
          bgcolor: darkMode ? '#1e1e1e' : '#f7f4f3',
          borderRadius: '10px',
          boxShadow: darkMode ? '0px 0px 10px rgba(255, 255, 255, 0.1)' : '0px 0px 10px rgba(0, 0, 0, 0.1)',
          color: darkMode ? '#f7f4f3' : '#000',
        }}
      >
        <Typography variant="h4" align="center" mb={3}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" align="center" mb={3}>
          Enter to get unlimited access to data & information.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
          </Grid>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
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

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ mt: 2, color: darkMode ? '#f7f4f3' : '#000' }}
          />
          <Box textAlign="right" sx={{ mt: 2 }}>
            <Link href="#" variant="body2" sx={{ color: darkMode ? '#90caf9' : '#1e88e5' }}>
              Forgot your password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: darkMode ? '#bb86fc' : '#6200ea' }}
          >
            Log In
          </Button>
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
          <Link href="#" variant="body2" underline="none" sx={{ color: darkMode ? '#90caf9' : '#1e88e5' }}>
            Register here
          </Link>
        </Typography>
      </Grid>
      {!matches && <img src="./center.png" width={400} height={400} alt="" />}
    </Grid>
  );
}

export default App;
