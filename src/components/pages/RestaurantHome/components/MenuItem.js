import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import './menuItem.scss';
import { IconButton } from '@mui/material';
import { AddCartItem, RemoveCartItem } from '../../../../store/actions/Cart';

const MenuItem = ({ data, cartItem }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(AddCartItem(data))
  }
  const handleRemoveItem = () => {
    dispatch(RemoveCartItem(data))
  }

  return (
    <Box className="menu-item" display="flex" justifyContent="space-between">
      <img src={data?.img || '#'} alt="item-img" className="item-img" />
      <Box className="item-content" display="flex" flexDirection="column" justifyContent="space-between" alignItems="flex-start">
        <Typography>{data?.name || '--'}</Typography>
        <Box display="flex" justifyContent="flex-start">
          <Rating name="half-rating" value={data?.rating || 0} precision={0.1} readOnly />
          <Typography>({data?.ratingsCount || 0} ratings)</Typography>
        </Box>
        <Typography>₹{data?.price || '--'}</Typography>
      </Box>
      <Box className="item-options">
        <IconButton onClick={handleAddItem}>
          <AddCircleOutlineIcon />
        </IconButton>{" "}{cartItem && data.count}
        <IconButton onClick={handleRemoveItem}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box >
    </Box >
  )
}

export default MenuItem
