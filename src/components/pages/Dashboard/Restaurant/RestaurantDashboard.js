import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SingleCard from './SingleCard';
import Header from '../../../utill/Header/Header';
import NavBar from '../../../utill/NavBar/NavBar';
import './RestaurantDashboard.scss'

const RestaurantDashboard = () => {

  return (
    <Header>
      <NavBar tab='dashboard'>
        <Box className='order-container'>
          <Box className="stats-container">
            <Box>
              <SingleCard title="Total Orders Placed Today" count="27" />
              <SingleCard title="Total Accepted Orders Today" count="25" />
              <SingleCard title="Total Cancelled Orders Today" count="2" />
            </Box>
            <Box >
              <SingleCard title="Total Orders" count="278" />
              <SingleCard title="Total Accepted Orders" count="249" />
              <SingleCard title="Total Cancelled Orders" count="29" />
            </Box>
          </Box>
          <Box className="requests-container">

          </Box>
        </Box>
      </NavBar>
    </Header>
  )
}

export default RestaurantDashboard;
