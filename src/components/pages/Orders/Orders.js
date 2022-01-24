import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllOrders } from '../../../api/Order';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import If from '../../utill/If/If';
import Order from '../../utill/Order/Order';
import emptyList from '../../../images/empty-list.png';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../utill/Header/Header';
import './orders.scss';

const Orders = () => {
  const user = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(false);
  console.log("orders page");
  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    const payload = {
      type: 'USER',
      id: user._id,
      token: user.token
    }
    setFetching(true);
    try {
      const data = await getAllOrders(payload);
      setOrders(data);
      setFetching(false);
    } catch (err) {
      alert("couldn't fetch orders");
      setFetching(false);
    }
  }

  return (
    <Header>
      <Box className='orders-list'>
        <If condition={fetching}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="noData-container">
            <CircularProgress />
          </Box>
        </If>
        <If condition={!fetching}>
          <If condition={orders.length > 0}>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px" className='items-list'>
              {
                orders.map(item => <Order data={item} />)
              }
            </Box>
          </If>
          <If condition={orders.length === 0}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="noData-container">
              <img className='empty-cart-icon' src={emptyList} alt="empty-cart" />
              <Typography className="empty-text">No orders available!</Typography>
            </Box>
          </If>
        </If>
      </Box>
    </Header>
  );
};

export default Orders;
