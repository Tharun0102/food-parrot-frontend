import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../../utill/Header/Header';
import RestaurantDashboard from './Restaurant/RestaurantDashboard';
import './dashboard.scss'
import UserDashboard from './User/UserDashboard';
import { useSelector } from 'react-redux';

import { USER_TYPE, RESTAURANT_TYPE } from '../../../common/constants';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const history = useHistory();

  const isUserRoute = params.type == USER_TYPE;
  const isRestaurantRoute = params.type == RESTAURANT_TYPE;
  const isValidRoute = isUserRoute || isRestaurantRoute;

  useEffect(() => {
    if (!isValidRoute || (isRestaurantRoute && !user?.isLogged)) {
      history.push("/");
    }
  }, [])

  return (
    <Box className="dashboard-container">
      <Header />
      {
        params.type === USER_TYPE &&
        <UserDashboard />
      }
      {
        params.type === RESTAURANT_TYPE &&
        <RestaurantDashboard />
      }
    </Box>
  )
}

export default Dashboard;
