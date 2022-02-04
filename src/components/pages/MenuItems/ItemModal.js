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
import { toast } from 'react-toastify';
import { Logout } from '../../../store/actions/User'
import { imageUpload } from '../../../api/upload';

const ItemModal = ({ itemModal, setItemModal, data, editModal, fetchItems }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
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
    if (input.name.length < 2 || input?.name.length > 25) {
      toast.error("name must be b/w 2 and 25 chars");
      return;
    }
    if (input.description.length < 2 || input?.description.length > 25) {
      toast.error("description must be b/w 2 and 25 chars");
      return;
    }

    let payload = {
      name: input.name,
      description: input.description,
      price: input.price,
      restaurantId: user._id,
      itemId: data?._id,
      token: user.token
    };
    if (input.image) payload.image = input.image;
    setLoading(true);
    try {
      if (editModal) {
        await editMenuItem(payload);
        setLoading(false);
        toast.success("updated");
        closeModal();
        fetchItems && fetchItems();
      } else {
        if (!input.image) {
          toast.error("image required!");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const imageId = await imageUpload({
              imageStr: reader.result,
              token: user?.token
            });
            payload.imageId = imageId;
            await addMenuItem(payload);
            toast.success("added!");
            closeModal();
            setLoading(false);
            fetchItems && fetchItems();
          } catch (err) {
            setLoading(false);
            toast.error("image upload failed!");
          }
        };
        reader.readAsDataURL(input.image);
        reader.onerror = () => {
          setLoading(false);
          toast.error('something went wrong!');
        };
      }

    } catch (err) {
      toast.error(err.message)
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
          <Button variant="contained" color='primary' className='confirm-btn' disabled={loading} onClick={handleSubmit}>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemModal;
