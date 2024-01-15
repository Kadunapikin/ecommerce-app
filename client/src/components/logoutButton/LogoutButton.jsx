import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './logoutButton.module.css';


const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage or your state management
    localStorage.removeItem('token');

    // Redirect to the login page or any desired page after logout
    navigate('/login');
  };

  return (
    <button className={classes.logoutbtn} onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
