import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { DarkModeContext, UserContext } from '../appContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // useNavigate to redirect to login
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext
  const { userDataform, handleLogout, loading } = useContext(UserContext); // Use UserContext

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    address: '',
    password: '',
  });


  // Check token validity on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // No token found, redirect to login page
      navigate('/loginform');
    } else {
      try {
        // Decode token to check expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          // Token expired, redirect to login page
          localStorage.removeItem('token');
          navigate('/loginform');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // If there is an error decoding the token, redirect to login page
        navigate('/loginform');
      }
    }
  }, [navigate]);

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

  return (
    <>
      <div className={` flex flex-wrap justify-around min-h-[86.5vh]  p-2 bg-${darkMode ? 'black' : 'gray-100'} transition-colors duration-3000`}>
        <div className={` md:w-1/3 mb-4 md:mb-0 w-full h-[40vh] md:h-[80vh] p-2 shadow-lg rounded-lg bg-${darkMode ? 'black' : 'gray-200'} text-${darkMode ? 'gray-100' : 'gray-900'} transition-colors duration-3000`}>

          <h1 className='font-bold text-center p-3 text-3xl'>
            User <span className='text-red-500'>Profile</span>
          </h1>
          {/* line  */}
          <div className={` h-[1px] ${darkMode ? 'bg-gray-100' : 'bg-gray-900'}`}></div>

          <h2 className='font-normal px-3 py-2 text-xl md:text-2xl'>
            <span className='font-semibold'> Welcome   </span>  {userData.fullName || 'Guest'}
          </h2>

          <h2 className='font-narmal px-3 py-2 text-xl md:text-2xl'>
            <span className='font-semibold'> Email:  </span>    {userData.email}
          </h2>
          <h2 className='font-narmal px-3 py-2 text-xl md:text-2xl'>
            <span className='font-semibold'>        Address: </span>  {userData.address}
          </h2>
          <div className=' flex  items-end justify-end px-6 py-5'>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              <Link to="/loginform" style={{ color: 'Background', textDecoration: 'none' }}>
                Logout
              </Link>
            </Button>
          </div>
        </div>
        {/*  put request frontend UI field of update profile  */}



        <div className={` md:w-1/3 w-full h-[70vh] md:h-[80vh] p-2 shadow-lg rounded-lg bg-${darkMode ? 'black' : 'gray-200'} text-${darkMode ? 'gray-100' : 'gray-900'}`}>
          <h2 className="font-bold text-center p-3 text-3xl">Update 
            <span className='text-red-500'> Profile</span>
            </h2>
          <div className='' >
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
            <div className='flex  items-end justify-end px-6 py-5'>

            <Button
              variant="contained"
              color="primary"
              
              onClick={handleSubmit}
              sx={{ mb: 2 }}
            >
              Update Profile
            </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Dashboard;
