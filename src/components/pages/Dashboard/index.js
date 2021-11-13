import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../../utill/Header/Header';
import RestaurantDashboard from './RestaurantDashboard';

import './dashboard.scss'
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const params = useParams();
  const history = useHistory();

  const USER_TYPE = 'user';
  const RESTAURANT_TYPE = 'restaurant';

  useEffect(() => {
    if (params.type !== USER_TYPE && params.type !== RESTAURANT_TYPE) {
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
