import React, { useContext, useState } from 'react';
import { DarkModeContext, UserContext } from '../appContext'; // Import the dark mode context
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { IconButton, Typography, Tooltip, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Import Link from React Router
import useMediaQuery from '@mui/material/useMediaQuery';
// Material UI Switch for Dark Mode
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Access dark mode context
  const { userDataform, handleLogout, loading } = useContext(UserContext); // Access user context to check login status
  const [drawerOpen, setDrawerOpen] = useState(false); // State to handle drawer open/close
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect mobile screens

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from UserContext
    navigate('/loginform'); // Redirect to login page
  };

  const capitalizeFirstLetter = (name) => {
    if (!name) return ' ';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Dark mode drawer styles
  const drawerStyle = {
    backgroundColor: darkMode ? '#333' : '#fff', // Dark or light background
    color: darkMode ? '#fff' : '#000',           // Dark or light text color
    width: '250px',
    height: '100%',
  };

  return (
    <nav className={`w-full p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className=" container flex justify-between w-[80vw] mx-auto ">
        {/* Logo */}
        <div>

          <img src="./logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Mobile Menu Icon */}
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>

            {/* Drawer for mobile view */}
            <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: {
      backgroundColor: darkMode ? '#333' : '#fff',  // Dark or light background
      color: darkMode ? '#fff' : '#000',            // Dark or light text color
      width: '250px',
      height: '100%',
    },
  }}
>
  <div
    className="w-64 p-4"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <List>
      <ListItem>
        {/* Dark Mode Toggle inside Drawer */}
        <div className="flex justify-start items-center gap-9">
          <MaterialUISwitch checked={darkMode} onChange={toggleDarkMode} />
          <h2>Dark Mode</h2>
        </div>
      </ListItem>

      {/* Conditionally render user profile if logged in */}
      {userDataform.fullName ? (
        <>
          <div className="flex justify-start items-center space-x-2 px-1">
            <ListItem component={Link} to="/dashboard">
              <Tooltip title="Profile">
                <img
                  className={darkMode ? 'invert' : ''}
                  src="profileicon.gif"
                  width={40}
                  height={40}
                  alt="Profile Icon"
                />
              </Tooltip>
            </ListItem>

            <ListItem component={Link} to="/dashboard">
              <h2 className="whitespace-nowrap">
                {capitalizeFirstLetter(userDataform.fullName)}
              </h2>
            </ListItem>
          </div>
        </>
      ) : (
        <ListItem>
          <Typography variant="body1">Not logged in</Typography>
        </ListItem>
      )}
    </List>
  </div>
</Drawer>

          </>
        ) : (
          // Desktop view
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <MaterialUISwitch checked={darkMode} onChange={toggleDarkMode} />

            {/* Show Profile button if logged in */}
            <div className='flex  w-[200px] items-center justify-center gap-4' >
              <h2 className='text-xl'> {userDataform.fullName ? capitalizeFirstLetter(userDataform.fullName) : ''}</h2>
              {userDataform.fullName && (
                <Tooltip title="Profile">
                  <Link to="/dashboard">
                    <img
                      className={darkMode ? 'invert' : ''}
                      src="profileicon.gif"
                      width={50}
                      height={50}
                      alt="Profile Icon"
                    />
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}