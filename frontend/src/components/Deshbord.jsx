import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e) => {
    setUserData({
      ...userData,
      profileImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = () => {
    console.log('Updated User Data:', userData);
  };

  const handlePasswordChange = () => {
    console.log('Password updated');
  };

  return (
    <Grid 
      container
      justifyContent="center"
      alignItems="center"
      p={2}
      sx={{ minHeight: '100vh' }}
    >
      <Box 
        color={'ActiveBorder'}
        sx={{ 
          width: '80vh', 
          p: 4, 
          boxShadow: 3, 
          borderRadius: 3, 
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          User Dashboard
        </Typography>

        {/* User Profile Section */}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="Profile Image"
              src={userData.profileImage}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </IconButton>
          </Grid>
        </Grid>

        {/* Name and Email Fields */}
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            value={userData.firstName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={userData.lastName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={userData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
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

        {/* Change Password Section */}
        <Box component="form" sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom align="center">
            Change Password
          </Typography>
          <TextField
            label="New Password"
            name="password"
            type="password"
            fullWidth
            value={userData.password}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Dashboard;
