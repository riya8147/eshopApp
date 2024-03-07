import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';

const NavigationBar = () => {
  const history = useHistory();

  const handleSignOut = () => {
    // Logic to handle sign out
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad Eshop
        </Typography>
        <Button component={Link} to="/login" color="inherit">
          Sign In
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Sign Up
        </Button>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
