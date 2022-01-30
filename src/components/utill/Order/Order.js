import React, { useState } from 'react';
import './order.scss';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { editOrder } from '../../../api/Order';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Order = ({ data, isCustomer, fetchOrders }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const statusOptions = ['Placed', 'Accepted', 'Out for Delivery', 'Completed'];
  const createdAt = new Date(data?.createdAt);
  const formattedDate = createdAt.getHours() + ":" + createdAt.getMinutes() + ", " +
    createdAt.getDate() + "-" + (createdAt.getMonth() + 1) + "-" + createdAt.getFullYear();

  let totalPrice = 0;
  data?.items?.forEach((item) => {
    totalPrice += (item?.count * item?.price);
  });

  const statusIndex = statusOptions.indexOf(data?.status || '')
  const nextState = (statusIndex === statusOptions.length) ? null :
    statusOptions[statusIndex + 1];

  const onEditOrder = async (payload) => {
    setLoading(true);
    try {
      await editOrder(payload, data?._id, user.token);
      toast.success("order updated succesfully!", { position: toast.POSITION.BOTTOM_RIGHT })
      setLoading(false);
      fetchOrders();
    } catch (err) {
      setLoading(false);
      toast.error(err.message)
    }
  }

  return (
    <Card className='order-card'>
      <CardContent>
        <KeyValue left="Order Id:" value={data?._id} />
        <KeyValue left="Ordered By:" value={data?.userId?.name} />
        <KeyValue left="Address:" value={data?.address?.houseNo + " " + data?.address?.street + " " + data?.address?.city} />
        <KeyValue left="Mobile:" value={data?.mobile} />
        <KeyValue left="Ordered From:" value={data?.items[0].Restaurant} />
        <Accordion className='summary-accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className='accordian-summary'
          >
            <Typography>Order Summary</Typography>
          </AccordionSummary>
          <AccordionDetails lassName='accordian-details'>
            {
              data?.items?.map((item) => (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>{item?.name}</Typography>
                  <Typography>{`Rs.${item?.price} x ${item?.count}`}</Typography>
                </Box>
              ))
            }
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Total: </Typography>
              <Typography>{totalPrice}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <KeyValue left="Ordered:" value={formattedDate} />
        <KeyValue left="Order Status:" value={data?.status} />
        <Box display="flex" marginTop="15px" gap="20px">
          {data?.status != 'Cancelled' && data?.status != 'Completed' && <Button variant="contained" className='cancel-btn' onClick={() => onEditOrder({ status: 'Cancelled' })}>Cancel</Button>}
          {!isCustomer && nextState && nextState != 'Placed' && <Button variant="contained" className='status-btn' onClick={() => onEditOrder({ status: nextState })}>Mark as {nextState}</Button>}
        </Box>
        {data?.status == 'Completed' &&
          <Rating
            precision={1}
            value={Math.ceil(data?.rating) || 0}
            onChange={(event, newValue) => {
              onEditOrder({ rating: newValue });
            }}
            disabled={!isCustomer || loading}
          />
        }
      </CardContent>
    </Card>
  );
};

const KeyValue = (props) => {
  return (
    <Box display="flex" gap="20px" className='order-info'>
      <Typography className='info-key'>{props.left}</Typography>
      <Typography className='info-value'>{props.value}</Typography>
    </Box>
  );
}

export default Order;
