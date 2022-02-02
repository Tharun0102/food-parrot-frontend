import React, { useState } from 'react';
import './payment.scss';

import Header from '../../utill/Header/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Radio, TextField } from '@mui/material';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import If from '../../utill/If/If';
import { createOrder } from '../../../api/Order';
import { editRestaurant } from '../../../api/Restaurant';
import { ClearCart } from '../../../store/actions/Cart';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../../common/constants';
import {Elements,useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Wrapper = (props) => (
  <Elements stripe={stripePromise}>
    <Payment {...props} />
  </Elements>
);

const Payment = (props) => {
  const stripe = useStripe();
  const history = useHistory();
  const dispatch = useDispatch();
  const [mode, setMode] = useState('COD');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const orderState = props.location.state;

  if(!orderState){
    return <Redirect to='/'/>
  }

  const address = orderState.address.houseNo+", "+
                  orderState.address.street+", "+
                  orderState.address.city;

  const handleAbort = () => {
    toast.info("payment aborted!")
    history.push(`/restaurant/${orderState.restaurantId}`);
  }

  const placeOrder = async() => {
    try {
      await createOrder({...orderState, paymentMode: 'COD'});
      toast.success("order placed!")
      dispatch(ClearCart());
      history.push('/orders');
    } catch (err) {
      toast.error(err.message);
    }
  }

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true)
    }
    return (false)
  }

  const handlePayment = async() => {
    if(!validateEmail(checkoutEmail)){
      toast.error("enter a valid checkout email!");
    }
    try{
      const payload={
        items: orderState.items,
        totalPrice: orderState.total,
        receipt_email: checkoutEmail,
        orderState: orderState
      }
      const res = await axios.post(`${BASE_URL}/create-checkout-session`,payload);
      const {sessionId} = res.data;
      const {error} = stripe.redirectToCheckout({
        sessionId
      })
      if(error){
        console.warn(error);
      }
    }catch(err){
      console.error("error",err);
    }
  }

  return (
    <Header>
      <Box className='payment-wrapper'>
        <Accordion className='summary-accordian' expanded>
          <AccordionSummary
            className='accordian-summary'
          >
            <Typography>Order Summary</Typography>
          </AccordionSummary>
          <AccordionDetails className='accordian-details'>
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Restaurant: </Typography>
              <Typography>{orderState.restaurantName}</Typography>
            </Box>
            <Typography style={{ fontWeight: 600 }}>Items: </Typography>
            <Box className='items-section'>
              {
                orderState?.items?.map((item) => (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{item?.name}</Typography>
                    <Typography>{`Rs.${item?.price} x ${item?.count}`}</Typography>
                  </Box>
                ))
              }
            </Box>
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Delivery Address: </Typography>
              <Typography>{address}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Mobile: </Typography>
              <Typography>{orderState.mobile}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Total: </Typography>
              <Typography>{orderState.total}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className='summary-accordian' expanded>
          <AccordionSummary
            className='accordian-summary'
          >
            <Typography>Payment Mode:</Typography>
          </AccordionSummary>
        </Accordion>
        <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
          <Radio value='COD' onClick={(e) => setMode(e.target.value)} checked={mode==='COD'}/>
          <Typography>Cash on Delivery</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
          <Radio value="stripe" onClick={(e) => setMode(e.target.value)} checked={mode==='stripe'}/>
          <Typography>Pay with Stripe</Typography>
        </Box>
        {mode==='stripe' && 
        <Box display='flex' alignItems='center' gap='20px' className='checkout-email-wrapper'>
          <Typography className='checkout-text'>Enter mail to checkout:</Typography>
          <TextField 
            value={checkoutEmail} 
            onChange={(e) => setCheckoutEmail(e.target.value)}
            className='checkout-email-field'
          />
        </Box>
        }
        <Box display="flex" gap="20px" justifyContent='center' className='payment-footer'>
          <Button variant="outlined" className='cancel-btn' onClick={handleAbort}>Cancel</Button>
          <If condition={mode === 'stripe'}>
            <Button variant="contained" color='primary' className='confirm-btn' onClick={handlePayment}>Checkout & Pay</Button>
          </If>
          <If condition={mode !== 'stripe'}>
            <Button variant="contained" color='primary' className='confirm-btn' onClick={placeOrder}>Order</Button>
          </If>
        </Box>
      </Box>
    </Header>
  );
};

export default Wrapper;
