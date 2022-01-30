import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../store/actions/User';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

import './NavBar.scss';
import { ClearCart } from '../../../store/actions/Cart';

const NavBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const selectedTab = props.tab;

  const handleLogout = () => {
    dispatch(ClearCart());
    dispatch(Logout());
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
        {props.children}
      </Box>
    </Box>
  );
};

export default NavBar;