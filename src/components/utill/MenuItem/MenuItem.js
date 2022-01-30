import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import './menuItem.scss';
import { Button, IconButton } from '@mui/material';
import { AddCartItem, RemoveCartItem } from '../../../store/actions/Cart';
import If from '../If/If';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemModal from '../../pages/MenuItems/ItemModal';
import CustomModal from '../Modal/Modal';

const MenuItem = ({ data, restaurantName, cartItem, isRestaurant, handleDeleteItem, fetchItems }) => {
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const url = data?.imageUrl.split('\\');
  const imageUrl = `http://localhost:5000/${url[0]}/${url[1]}`;

  const handleAddItem = () => {
    dispatch(AddCartItem({ ...data, Restaurant: restaurantName }))
  }
  const handleRemoveItem = () => {
    dispatch(RemoveCartItem(data))
  }
  const handleDelete = () => {
    handleDeleteItem(data._id);
    setDeleteModal(false);
  }
  return (
    <Box className="menu-item" display="flex" justifyContent="space-between">
      {isRestaurant && <ItemModal
        itemModal={itemModal}
        setItemModal={setItemModal}
        data={data}
        editModal
        fetchItems={fetchItems}
      />}
      <CustomModal
        open={deleteModal}
        setItemModal={() => setDeleteModal(false)}
      >
        <Typography>Are you sure you want to delete?</Typography>
        <hr className='custom-seperator' />
        <Box display="flex" gap="20px" justifyContent='center' className='modal-footer'>
          <Button variant="outlined" className='cancel-btn' onClick={() => { setDeleteModal(false); setDeleteModal(false) }}>Cancel</Button>
          <Button variant="contained" color='primary' className='confirm-btn' onClick={handleDelete}>Confirm</Button>
        </Box>
      </CustomModal>
      <img src={imageUrl || '#'} alt="item-img" className="item-img" />
      <Box className="item-content" display="flex" flexDirection="column" justifyContent="space-between" alignItems="flex-start">
        <Typography>{data?.name || '--'}</Typography>
        <Typography>{data?.description || 'No Description available!'}</Typography>
        {/* <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Rating name="half-rating" value={data?.rating || 0} precision={0.1} readOnly />
          <Typography>({data?.ratingsCount || 0} ratings)</Typography>
        </Box> */}
        <Typography>₹{data?.price || '--'}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" className="item-options">
        <If condition={isRestaurant}>
          <>
            <IconButton onClick={() => setItemModal(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setDeleteModal(true)}>
              <DeleteIcon />
            </IconButton>
          </>
        </If>
        <If condition={!isRestaurant}>
          <>
            <IconButton onClick={handleAddItem}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Typography>{cartItem && data.count}</Typography>
            <IconButton onClick={handleRemoveItem}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </>
        </If>
      </Box >
    </Box >
  )
}

export default MenuItem
