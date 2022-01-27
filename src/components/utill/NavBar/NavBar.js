import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../../constants/constants';
import { UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

import './NavBar.scss';

const NavBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const selectedTab = props.tab;

  const handleLogout = () => {
    const action = (user?.userType == USER) ? UpdateClientUser({}) : UpdateRestaurantUser({});
    dispatch(action);
    history.push('/');
  }

  return (
    <Box display="flex">
      <Box className='admin-menu'>
        <Box className='restaurant-title'>{user.name}</Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start" className='admin-list'>
          <Typography
            className={`nav-link ${selectedTab == 'dashboard' ? "selected-link" : ""}`}
            onClick={() => history.push('/dashboard')}
          >
            <DashboardIcon /> Dashboard
          </Typography>
          <Typography
            className={`nav-link ${selectedTab == 'menuItems' ? "selected-link" : ""}`}
            onClick={() => history.push('/menuItems')}
          >
            <ListIcon /> Menu Items
          </Typography>
          <Typography
            className={`nav-link ${selectedTab == 'orders' ? "selected-link" : ""}`}
            onClick={() => history.push('/orders')}
          >
            <HistoryIcon /> Orders
          </Typography>
          <Typography
            className={`nav-link ${selectedTab == 'profile' ? "selected-link" : ""}`}
            onClick={() => history.push('/profile')}
          >
            <AccountBoxOutlinedIcon /> Profile
          </Typography>
          <Typography className='nav-link logout' onClick={handleLogout}>
            <LogoutIcon /> Logout
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" className='content-wrapper'>
        {/* <Typography className='page-title'>{selectedTab}</Typography> */}
        {props.children}
      </Box>
    </Box>
  );
};

export default NavBar;