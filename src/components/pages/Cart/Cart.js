import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import tempImg from '../../../images/auth-background.png'
import MenuItem from '../RestaurantHome/components/MenuItem';
import { useSelector } from 'react-redux';

import './cart.scss';
import CustomModal from '../../utill/Modal/Modal';

const MENU_ITEMS = [
  {
    id: 1,
    restaurant: '',
    name: 'Chicken Biriyani',
    img: tempImg,
    price: 200
  },
  {
    id: 2,
    restaurant: '',
    name: 'Sweets',
    img: tempImg,
    price: 100
  },
  {
    id: 3,
    restaurant: '',
    name: 'Ice Cream',
    img: tempImg,
    price: 60
  },
  {
    id: 4,
    restaurant: '',
    name: 'Roti',
    img: tempImg,
    price: 30
  }
]

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const itemList = cart || [];
  const [total, setTotal] = useState(0);
  const [orderModal, setOrderModal] = useState(false);

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price * item.count;
    })
    setTotal(newTotal);
  }, [cart])

  const handleOrder = () => {
    setOrderModal(true)
  }

  const placeOrder = () => {

  }

  return (
    <Box className="cart-container">
      <CustomModal
        open={orderModal}
        onClose={() => setOrderModal(false)}
      >
        <Box className="order-modal">
          <Typography>Are u sure you want to Place this order?</Typography>
          <hr className="custom-seperator" />
          <Typography>Payment Mode: Cash On Delivery</Typography>
          <Typography>Total: {total || 0}</Typography>
          <Box>
            <Button
              onClick={() => setOrderModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={placeOrder}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </CustomModal>
      <Typography className="title">Cart</Typography>
      {itemList?.length > 0 &&
        <Typography className="sub-title">Restaurant: {itemList[0].Restaurant}</Typography>
      }
      <Box>
        {
          itemList.length > 0 &&
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="items-list">
            {
              itemList.map((item, index) => {
                return <MenuItem data={item} cartItem />
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
        <Typography>Total: {total || 0}</Typography>
        <Button
          onClick={handleOrder}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
