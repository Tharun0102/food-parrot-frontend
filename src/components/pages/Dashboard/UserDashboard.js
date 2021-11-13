import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import tempImg from '../../../images/auth-background.png';
import Restaurant from './components/Restaurant';

import './userDashboard.scss'
import Cart from '../Cart/Cart';

const RESTAURANTS = [
  {
    id: 1,
    name: 'restauant 1',
    img: tempImg,
    description: 'description restaurant 1'
  },
  {
    id: 2,
    name: 'restauant 2',
    img: tempImg,
    description: 'description restaurant 2'
  },
  {
    id: 3,
    name: 'Tirupati Res',
    img: tempImg,
    description: 'at Tirupati, super food'
  },
  {
    id: 4,
    name: 'Delhi',
    img: tempImg,
    description: 'at delhi, super food'
  }
]

const UserDashboard = () => {
  const [input, setInput] = useState('');

  const [restaurants, setRestaurants] = useState(RESTAURANTS);

  const handleSearch = () => {
    const updatesRestaurants = RESTAURANTS.filter((item) => item.name.trim().includes(input))
    setRestaurants(updatesRestaurants);
  }

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  return (
    <Box display="flex">
      <Box className="user-dashboard">
        <Typography>Customer Dashboard</Typography>
        <Box className="restaurants-search">
          <OutlinedInput
            placeholder="Search for Restaurants"
            type="text"
            className="input-field"
            value={input.name}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeypress}
            onBlur={handleSearch}
          />
          <Button variant="contained" className="search-btn" onClick={handleSearch}>Search</Button>
        </Box>
        <Box className="restaurants-list-container">
          {
            restaurants.length > 0 &&
            <Box className="restaurants-list">
              {restaurants.map((item, index) =>
                <Restaurant
                  key={item.id}
                  data={item}
                />
              )}
            </Box>
          }
          {
            restaurants.length === 0 &&
            <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
              <Typography>No Restaurants Found!</Typography>
            </Box>
          }
        </Box>
      </Box>
      <Cart />
    </Box>
  )
}

export default UserDashboard
