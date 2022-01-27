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
import { USER } from '../../../constants/constants';
import NavBar from '../../utill/NavBar/NavBar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './orders.scss';

const Orders = () => {
  const user = useSelector(state => state.user);
  const isCustomer = user?.userType == USER;
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fetching, setFetching] = useState(false);
  const statusOptions = ['Placed', 'Accepted', 'Out for Delivery', 'Completed', 'Cancelled'];

  useEffect(() => {
    fetchOrders();
  }, [statusFilter])

  const fetchOrders = async () => {
    let payload = {
      type: isCustomer ? 'USER' : 'RESTAURANT',
      id: user._id,
      token: user.token,
      status: statusFilter
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

  const ordersSection = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap="25px" marginTop="20px">
        {!isCustomer && <Box display="flex" alignItems="center" gap="25px">
          <Typography>Status:</Typography>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            className='status-dropdown'
          >
            <MenuItem value="">All</MenuItem>
            {
              statusOptions.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))
            }
          </Select>
        </Box>}
        <Box className='orders-list' marginTop="20px">
          <If condition={fetching}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="noData-container">
              <CircularProgress />
            </Box>
          </If>
          <If condition={!fetching}>
            <If condition={orders.length > 0}>
              <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px" className='items-list'>
                {
                  orders.map(item => <Order data={item} isCustomer={isCustomer} fetchOrders={fetchOrders} />)
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
      </Box>
    )
  }

  return (
    <Header>
      {
        isCustomer ? ordersSection()
          :
          <NavBar tab='orders'>
            {ordersSection()}
          </NavBar>
      }
    </Header>
  );
};

export default Orders;
