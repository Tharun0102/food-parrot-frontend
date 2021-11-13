import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './Restaurant.scss';
import Rating from '@mui/material/Rating';
import { useHistory } from 'react-router-dom';

const Restaurant = ({ data }) => {

  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/Restaurant/${data?.id}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }} className="restaurant-card" onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="194"
        image={data?.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className="card-title">{data?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.description || 'No Description available!'}
        </Typography>
        <Box className="rating-container">
          <Rating name="half-rating" value={data?.rating || 0} precision={0.1} readOnly />
          <Typography>({data?.ratingsCount || 0} ratings)</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Restaurant
