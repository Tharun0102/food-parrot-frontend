import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import tempImg from '../../../images/auth-background.png'
import MenuItem from '../RestaurantHome/components/MenuItem';

import './cart.scss';

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Chicken Biriyani',
    img: tempImg,
    price: 200
  },
  {
    id: 2,
    name: 'Sweets',
    img: tempImg,
    price: 100
  },
  {
    id: 3,
    name: 'Ice Cream',
    img: tempImg,
    price: 60
  },
  {
    id: 4,
    name: 'Roti',
    img: tempImg,
    price: 30
  }
]

const Cart = () => {
  const [itemList, setItemList] = useState(MENU_ITEMS);

  return (
    <Box className="cart-container">
      <Typography className="title">Cart</Typography>
      <Box>
        {
          itemList.length > 0 &&
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="items-list">
            {
              itemList.map((item, index) => {
                return <MenuItem data={item} />
              })
            }
          </Box>
        }
        {
          itemList.length === 0 &&
          <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
            <Typography>Cart is Empty!</Typography>
          </Box>
        }
      </Box>
      <Box className="cart-footer">
        <Typography>Total: </Typography>
        <Button

        >
          Place Order
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
