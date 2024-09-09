import React, { useState } from 'react';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} md={4} p={4} bgcolor="#f0f0f0" borderRadius="10px">
        <Typography variant="h4" align="center" mb={3}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" align="center" mb={3}>
          Enter to get unlimited access to data & information.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ mt: 2 }}
          />
          <Box textAlign="right" sx={{ mt: 2 }}>
            <Link href="#" variant="body2">
              Forgot your password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2, mb: 3 }}
            onClick={() => {
              // Handle Google Sign-In logic here
            }}
          >
            Sign Up with Google
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link href="#" variant="body2" underline="none">
            Register here
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default App;
