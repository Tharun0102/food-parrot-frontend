import React from 'react';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Typography from '@mui/material/Typography';
import { CardContent, Card } from '@mui/material';
import { Button } from '@mui/material';
import './RestaurantDashboard.scss'
import SingleCard from './SingleCard';



const RestaurantDashboard = () => {
  const history = useHistory();
  return (
    <Box className='main'>
      <Box className='admin-menu'>
        <Box className='restaurant-title'>ALPHA</Box>
        <Box className='admin-list'>
          <Button variant='text' onClick={() => history.push('/')} >Add Item</Button>
          <Button variant='text' onClick={() => history.push('/')} >Transactions List</Button>
          <Button variant='text' onClick={() => history.push('/')} >Scheduled Orders</Button>
          <Button variant='text' onClick={() => history.push('/')} >History</Button>
          <Button variant='text' onClick={() => history.push('/')} >Logout</Button>
        </Box>
      </Box>
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

    </Box>
  )
}

export default RestaurantDashboard;
