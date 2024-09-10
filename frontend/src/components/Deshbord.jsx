import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { DarkModeContext, UserContext } from '../appContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext
  const { userDataform, loading } = useContext(UserContext); // Use UserContext

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    address: '',
    password: '',
  });

  const [showProfile, setShowProfile] = useState(false); // For toggling the profile form
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && userDataform) {
      setUserData({
        fullName: userDataform.fullName || '',
        email: userDataform.email || '',
        address: userDataform.address || '',
        password: '', // Don't populate password from context for security reasons
      });
    }
  }, [userDataform, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:3001/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          email: userData.email,
          address: userData.address,
          password: userData.password, // Send password only if it needs to be updated
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('User profile updated:', data);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        p={2}
        sx={{
          minHeight: '100vh',
          backgroundColor: darkMode ? '#121212' : '#f7f4f3',
          transition: 'background-color 0.3s',
        }}
      >
        <Box
          sx={{
            width: '80vh',
            p: 4,
            boxShadow: 3,
            borderRadius: 3,
            bgcolor: darkMode ? '#1e1e1e' : '#f7f4f3',
            color: darkMode ? '#f7f4f3' : '#000',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            User Dashboard
          </Typography>

          <Typography variant="h6" gutterBottom align="center">
            Welcome, {userData.fullName || 'Guest'}!
          </Typography>

          <Typography variant="body1" gutterBottom align="center">
            Email: {userData.email}
          </Typography>

          <Typography variant="body1" gutterBottom align="center">
            Address: {userData.address}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowProfile(!showProfile)} 
            sx={{ mb: 2 }}
          >
            {showProfile ? 'Hide Profile' : 'Update Profile'}
          </Button>

          {showProfile && (
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                value={userData.fullName}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={userData.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={userData.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
              />
              <TextField
                label="New Password"
                name="password"
                type="password"
                fullWidth
                value={userData.password}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
                InputLabelProps={{
                  style: { color: darkMode ? '#fff' : '#000' },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mb: 2 }}
              >
                Update Profile
              </Button>
            </Box>
          )}

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default Dashboard;
