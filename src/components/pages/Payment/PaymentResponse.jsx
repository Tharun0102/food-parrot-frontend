import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../../api/Order';
import { editRestaurant } from '../../../api/Restaurant';
import { BASE_URL } from '../../../common/constants';
import { ClearCart } from '../../../store/actions/Cart';
import successIcon from '../../../images/success-icon.png';
import cancelledIcon from '../../../images/cancelled-icon.png';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PaymentResponse = () => {
  const user = useSelector(state => state.user);
  const {response}=useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    handleSession();
  },[])
  
  const getUrlQueryParams = () => {
    let queryParams = {};
    const params = window.location.search.substring(1).split("&");
    params.forEach(param => {
      const item = param.split("=");
      const key= item[0], value=item[1];
      queryParams[key]=value;
    })
    return queryParams;
  }

  const handleSession = async() => {
    if(response === 'success'){
      const session = await retrieveSession();
      await addToWallet(session);
      let payload={...session.metadata};
      payload.items = JSON.parse(session.metadata.items);
      payload.address = JSON.parse(session.metadata.address);
      payload.paymentMode = 'Card';
      placeOrder(payload);
      expireSession();
    }else if(response === 'cancel'){
      expireSession();
      setTimeout(() => {
        history.push('/dashboard/User');
      }, 3000);
    }
  }

  const addToWallet = async (session) => {
    const { restaurantId }= session.metadata;
    if(session.payment_status === "paid" && session.status === "complete"){
      await editRestaurant({
        paymentAmount: session.amount_total/100,
        restaurantId: restaurantId,
        token: user.token
      });
      history.push('/dashboard/User');
    }
  }
  
  const retrieveSession = async() => {
    const queryParams = getUrlQueryParams();
    const sessionId = queryParams.session_id;
    try{
      const res = await axios.post(`${BASE_URL}/retrieve-session`,{sessionId: sessionId});
      return res.data;
    }catch(err){
      console.error("error",err);
      return null;
    }
  }

  const expireSession = async() => {
    const queryParams = getUrlQueryParams();
    const sessionId = queryParams.session_id;
    try{
      await axios.post(`${BASE_URL}/expire-session`,{sessionId: sessionId});
    }catch(err){
      console.error("error",err);
    }
  }

  const placeOrder = async(payload) => {
    try {
      await createOrder(payload);
      toast.success("order placed!")
      dispatch(ClearCart());
      history.push('/orders');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Box display="flex" flexDirection='column' gap='20px' justifyContent='center' alignItems='center' className='payment-status' width='100vw' height='100vh'>
      <img 
        src={response === 'success' ? successIcon : cancelledIcon} 
        alt='payment status'
        style={{
          width: 300,
          height: 300
        }}
      />
      <Typography
        style={{
          fontSize: '20px',
          fontWeight: 600
        }}
      >
        {response === 'success' ? 'Payment Successful!' : 'Payment Failed!'}
      </Typography>
      <Typography
        style={{
          fontSize: '20px',
          fontWeight: 600
        }}
      >
        Please wait... automatically redirecting to your website
      </Typography>
    </Box>
  );
};

export default PaymentResponse;
