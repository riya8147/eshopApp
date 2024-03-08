import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Logo from './logo.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(2), // Adjust spacing as needed
    width: 40, // Adjust width as needed
    height: 'auto', // Maintain aspect ratio
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar = ({ loggedIn, isAdmin }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSignOut = () => {
    // Perform sign-out logic
    // For example, clear local storage, reset state, etc.
    // Then redirect the user to the login page
    history.push('/login');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <img src={Logo} alt="Logo" className={classes.logo} /> {/* Display logo */}
        <Typography variant="h6" className={classes.title}>
          {/* Remove text and use logo instead */}
        </Typography>
        {loggedIn && isAdmin && ( // Display "Manage Products" link for admin users
          <Button component={Link} to="/manage-products" color="inherit">
            Manage Products
          </Button>
        )}
        {!loggedIn && ( // Display "Sign In" and "Sign Up" buttons if not logged in
          <>
            <Button component={Link} to="/login" color="inherit">
              Sign In
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          </>
        )}
        {loggedIn && ( // Display "Sign Out" button if logged in
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
