import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '../../utill/MenuItem/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import emptyCart from '../../../images/empty-cart.png';
import './cart.scss';
import CustomModal from '../../utill/Modal/Modal';
import { ClearCart } from '../../../store/actions/Cart';
import { createOrder } from '../../../api/Order';
import { FormControl, Input, InputLabel } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const itemList = cart || [];
  const [total, setTotal] = useState(0);
  const [orderModal, setOrderModal] = useState(false);
  const [address, setAddress] = useState({
    houseNo: '',
    street: '',
    city: ''
  })
  const [mobile, setMobile] = useState('')

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

  const handleChange = (e, key) => {
    setAddress({ ...address, [key]: e.target.value });
  }

  const placeOrder = async () => {
    if (itemList.length === 0) {
      toast.info("cart is empty!");
      return;
    }
    if (!user._id || !user.token) {
      history.push('/login/User')
      toast.info("login to place an order!");
      return;
    }
    if (address.houseNo.length === 0 || address.street.length === 0 || address.city.length === 0) {
      toast.error("address required!");
      return;
    }
    if (mobile.length === 0) {
      toast.error("mobile number required!");
      return;
    }
    const payload = {
      userId: user._id,
      restaurantId: cart[0].restaurantId,
      items: cart,
      order_status: 'Placed',
      address,
      mobile,
      token: user.token
    }
    try {
      await createOrder(payload);
      setOrderModal(false);
      toast.success("order placed!")
      dispatch(ClearCart());
      history.push('/orders');
    } catch (err) {
      toast.error(err.message);
    }
  }

  const clearCart = () => {
    dispatch(ClearCart())
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" className="cart-container">
      <CustomModal
        open={orderModal}
        onClose={() => setOrderModal(false)}
      >
        <Box className="order-modal">
          <Typography>Are u sure you want to Place this order?</Typography>
          <hr className="custom-seperator" />
          <Typography>Address:</Typography>
          <FormControl fullWidth className='item-input' variant="standard">
            <InputLabel htmlFor="houseNo">House No</InputLabel>
            <Input
              id='houseNo'
              type='text'
              value={address.houseNo}
              onChange={(e) => handleChange(e, 'houseNo')}
            />
          </FormControl>
          <FormControl fullWidth className='item-input' variant="standard">
            <InputLabel htmlFor="street">Street</InputLabel>
            <Input
              id='street'
              type='text'
              value={address.street}
              onChange={(e) => handleChange(e, 'street')}
            />
          </FormControl>
          <FormControl fullWidth className='item-input' variant="standard">
            <InputLabel htmlFor="city">city</InputLabel>
            <Input
              id='city'
              type='text'
              value={address.city}
              onChange={(e) => handleChange(e, 'city')}
            />
          </FormControl>
          <FormControl fullWidth className='item-input' variant="standard">
            <InputLabel htmlFor="mobile">Mobile No</InputLabel>
            <Input
              id='mobile'
              type='text'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </FormControl>
          <Typography>Payment Mode: Cash On Delivery</Typography>
          <Typography>Total: {total || 0}</Typography>
          <Box display="flex" gap="20px" justifyContent='center' className='modal-footer'>
            <Button variant="outlined" className='cancel-btn' onClick={() => setOrderModal(false)}>Cancel</Button>
            <Button variant="contained" color='primary' className='confirm-btn' onClick={placeOrder}>Confirm</Button>
          </Box>
        </Box>
      </CustomModal>
      <Typography className="title">My Cart</Typography>
      {itemList?.length > 0 &&
        <Typography className="sub-title">Restaurant: {itemList[0].Restaurant}</Typography>
      }
      <Box className='cart-content'>
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
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
            <img className='empty-cart-icon' src={emptyCart} alt="empty-cart" />
            <Typography className="empty-text">Cart is Empty!</Typography>
          </Box>
        }
      </Box>
      <Box className="cart-footer">
        <Typography className="total-text">Total: {total || 0}</Typography>
        <Box display="flex" gap="20px" marginTop="10px">
          <Button variant="outlined" className='cancel-btn' onClick={clearCart}>Clear Cart</Button>
          <Button variant="contained" color='primary' className='confirm-btn' onClick={handleOrder}>Place Order</Button>
        </Box>
      </Box>
      <Box display="flex">
        <span className='bubble'></span>
        <span className='bubble'></span>
        <span className='bubble'></span>
        <span className='bubble'></span>
        <span className='bubble'></span>
      </Box>
    </Box>
  )
}

export default Cart
