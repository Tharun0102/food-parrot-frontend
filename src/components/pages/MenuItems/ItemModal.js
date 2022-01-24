import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import { addMenuItem } from '../../../api/Restaurant';
import { useSelector } from 'react-redux';
import { editMenuItem } from '../../../api/MenuItem';

const ItemModal = ({ itemModal, setItemModal, data, editModal, fetchItems }) => {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    rating: 0,
    ratingCount: 0
  });

  useEffect(() => {
    if (data) {
      let updated = { ...input };
      Object.keys(data).forEach((key) => {
        updated = { ...updated, [key]: data[key] }
      })
      setInput(updated);
    }
  }, [])

  const handleChange = (e, type) => {
    setInput({ ...input, [type]: e.target.value });
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, image: file });
  }

  const closeModal = () => {
    setItemModal(false);
  }

  const handleSubmit = async () => {
    if (input.name.length < 2 || input?.name.length > 15) {
      alert("name must be b/w 2 and 15 chars");
      return;
    }

    const payload = new FormData();
    input.image && payload.append("image", input.image);
    payload.append('name', input.name);
    payload.append('description', input.description);
    payload.append('price', input.price);
    payload.append('restaurantId', user._id);

    try {
      if (editModal) await editMenuItem(data._id, payload, user.token);
      else await addMenuItem(payload, user._id, user.token);
      alert(editModal ? "updated" : "added!");
      closeModal();
      fetchItems && fetchItems();
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <Modal open={itemModal} onClose={closeModal}>
      <Box display="flex" flexDirection="column" className='item-modal-wrapper'>
        <FormControl fullWidth className='item-input' variant="standard">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id='name'
            type='text'
            value={input.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </FormControl>
        <FormControl fullWidth className='item-input' variant="standard">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id='description'
            type='text'
            value={input.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </FormControl>
        <FormControl fullWidth className='item-input' variant="standard">
          <InputLabel htmlFor="price">Price:</InputLabel>
          <Input
            id='price'
            type='number'
            value={input.price}
            onChange={(e) => handleChange(e, 'price')}
            startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
          />
        </FormControl>
        <input accept='image/*' type="file" className="custom-file-input" onChange={onFileChange} />
        <Box display="flex" gap="20px" justifyContent='center' className='modal-footer'>
          <Button variant="outlined" className='cancel-btn' onClick={closeModal}>Cancel</Button>
          <Button variant="contained" color='primary' className='confirm-btn' onClick={handleSubmit}>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemModal;
