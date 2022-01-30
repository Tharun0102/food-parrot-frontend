import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Image } from 'cloudinary-react'
import './Restaurant.scss';
import Rating from '@mui/material/Rating';
import { useHistory } from 'react-router-dom';

const Restaurant = ({ data }) => {
  const history = useHistory();
  const handleCardClick = () => {
    history.push(`/Restaurant/${data?._id}`);
  }

  return (<>
    <Card sx={{ maxWidth: 345 }} className="restaurant-card" onClick={handleCardClick}>
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
        publicId={data?.imageId}
        width="270"
        height='230'
        crop="scale"
      />
      <CardContent>
        <Typography className="card-title">{data?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.description || 'No Description available!'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.address.street},{data.address.city}
        </Typography>
        <Box className="rating-container">
          <Rating name="half-rating" value={Math.ceil(data?.rating) || 0} precision={1} readOnly />
          <Typography>({data?.ratingsCount || 0} ratings)</Typography>
        </Box>
      </CardContent>
    </Card>
  </>

  )
}

export default Restaurant
