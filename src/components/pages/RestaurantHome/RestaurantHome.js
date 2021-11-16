import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import tempImg from '../../../images/auth-background.png';
import MenuItem from './components/MenuItem';
import Cart from '../Cart/Cart';

const MENU_ITEMS = [
  {
    id: 1,
    Restaurant: 'res1',
    name: 'Chicken Biriyani',
    img: tempImg,
    price: 200
  },
  {
    id: 2,
    Restaurant: 'res1',
    name: 'Sweets',
    img: tempImg,
    price: 100
  },
  {
    id: 3,
    Restaurant: 'res2',
    name: 'Ice Cream',
    img: tempImg,
    price: 60
  },
  {
    id: 4,
    Restaurant: 'res2',
    name: 'Roti',
    img: tempImg,
    price: 30
  }
]

const RestaurantHome = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    const restaurantId = params.id;
    // fetch restuarant
    // setData({});
    // fetch menu items
    // setMenuItems([]);
  }

  return (
    <Box display="flex">
      <Box className="restaurant-home" flexGrow="1">
        <Box>
          <Typography>{data?.id || 'Restaurant'}</Typography>
          {
            menuItems.length > 0 &&
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="menuItems-list">
              {
                menuItems.map((item, index) => {
                  return <MenuItem data={item} />
                })
              }
            </Box>
          }
          {
            menuItems.length === 0 &&
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

export default RestaurantHome
