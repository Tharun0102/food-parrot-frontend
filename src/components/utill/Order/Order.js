import { Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';

import './order.scss';

const Order = ({ data }) => {
  const createdAt = new Date(data?.createdAt);
  const formattedDate = createdAt.getHours() + ":" + createdAt.getMinutes() + ", " +
    createdAt.getDate() + "/" + (createdAt.getMonth() + 1) + "/" + createdAt.getFullYear();
  return (
    <Card className='order-card'>
      <CardContent>
        <KeyValue left="Order Id:" value={data?._id} />
        <KeyValue left="Ordered By:" value={data?.userId?.name} />
        <KeyValue left="Address:" value={data?.address?.houseNo + " " + data?.address?.street + " " + data?.address?.city} />
        <KeyValue left="Ordered:" value={formattedDate} />
        <KeyValue left="Order Status:" value={data?.status} />
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
