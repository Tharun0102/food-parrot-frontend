import React,{useState} from 'react';
import Header from '../../utill/Header/Header';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RESTAURANT, USER } from '../../../constants/constants';
import { editRestaurant } from '../../../api/Restaurant';
import { UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';
import { editUser } from '../../../api/User';
import { CircularProgress } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const user=useSelector((state) => state.user);
  const isCustomer = user?.userType === USER;
  const isRestaurantUser = user?.userType === RESTAURANT;
  const actualUrl = user?.imageUrl?.split('\\');
  const profileUrl = actualUrl && `http://localhost:5000/${actualUrl[0]}/${actualUrl[1]}`
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({
      name: user?.name || '',
      email: user?.email || '',
      houseNo: user?.address?.houseNo || '',
      city: user?.address?.city || '',
      street: user?.address?.street || '',
      zip: user?.address?.zip || '',
      image: null
    });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if(input.name.length <2 || input.name.length >25){
      alert("name must be b/w 2 and 25 letters");
      return;
    }
    if(input.city.length <2 || input.city.length >25){
      alert("city must be b/w 2 and 20 letters");
      return;
    }
    if(input.street.length <2 || input.street.length >25){
      alert("street must be b/w 2 and 25 letters");
      return;
    }

    setLoading(true);
    
    
    try {
      if (isCustomer) {
        const resp = await editUser({
          name: input.name,
          email: input.email,
          address: {
            houseNo: input.houseNo,
            city: input.city,
            street: input.street,
            zip: input.zip
          }
        },user?._id, user?.token);
        setLoading(false);
        setEditing(false);
        alert("edited succesfully!")
        dispatch(UpdateClientUser({ ...resp.data, isLogged: true, userType: USER, 'x-auth-token': resp.headers['x-auth-token'] }));
      } else {
        let formData = new FormData();
        formData.append('name', input.name)
        formData.append('email', input.email)
        formData.append('city',input.city);
        formData.append('street',input.street);
        formData.append('zip',input.zip);
        input.image && formData.append('image', input.image);

        const resp = await editRestaurant(formData, user?._id, user?.token);
        setLoading(false);
        setEditing(false);
        alert("edited succesfully!")
        dispatch(UpdateRestaurantUser({ ...resp.data, isLogged: true, userType: RESTAURANT, 'x-auth-token': resp.headers['x-auth-token'] }));
      }
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, image: file });
  }

  return (
    <Header>
      <Box display="flex" flexDirection="column" alignItems="flex-start" className='profile-page-wrapper'>
        <Box display="flex" justifyContent="space-between" className='profile-header'>
          <Typography className='page-title'>My Profile</Typography>
          <Tooltip title="Edit" placement="right">
            <div className={editing ? "edit-icon color-blue" : "edit-icon"} onClick={() => setEditing(true)}>
                <EditIcon />
            </div>
          </Tooltip>
        </Box>
        <Box style={{ pointerEvents: !editing ? 'none' : 'all', opacity: editing ? 1 : .8}} className='profile-content' display="flex" flexDirection="column" justifyContent="space-between" alignItems="flex-start" gap="10px">
          {isRestaurantUser && <Box display="flex" alignItems="center" gap="20px" className='profile-img-wrapper'>
            <Typography className='profile-text'>Profile Picture:</Typography>
            <img src={profileUrl} className='profile-img' alt="not found"/>
          </Box>}
          <Box className="input-container">
            <TextField
              id="filled-search"
              label={isCustomer ? 'Name' : 'Restaurant Name'}
              className='input-field'
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              variant='standard'
            />
          </Box>
          <Box className="input-container">
            <TextField
              id="filled-search"
              label="Email"
              className='input-field'
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              variant='standard'
            />
          </Box>
          {isCustomer && <Box className="input-container">
            <TextField
              id="outlined-input"
              label="House No"
              type="text"
              className='input-field'
              value={input.houseNo}
              onChange={(e) => setInput({ ...input, houseNo: e.target.value })}
              variant='standard'
            />
          </Box>}
          <Box className="input-container">
            <TextField
              id="outlined-password-input"
              label="City"
              type="text"
              className='input-field'
              value={input.city}
              onChange={(e) => setInput({ ...input, city: e.target.value })}
              variant='standard'
            />
          </Box>
          <Box className="input-container">
            <TextField
              id="outlined-password-input"
              label="Street"
              type="text"
              className='input-field'
              value={input.street}
              onChange={(e) => setInput({ ...input, street: e.target.value })}
              variant='standard'
            />
          </Box>
          <Box className="input-container">
            <TextField
              id="outlined-password-input"
              label="zip"
              type="text"
              className='input-field'
              value={input.zip}
              onChange={(e) => setInput({ ...input, zip: e.target.value })}
              variant='standard'
            />
          </Box>
          {isRestaurantUser && <Box display="flex" alignItems="center" gap="20px" className="input-container">
            <Typography>Change Profile Picture:</Typography>
            <input accept='image/*' type="file" className="custom-file-input" onChange={onFileChange} />
          </Box>}
        </Box>
        <Box display="flex" gap="20px" justifyContent='center' className='profile-footer'>
          <Button variant="outlined" disabled={!editing} className='cancel-btn' onClick={() => setEditing(false)}>Cancel</Button>
          <Button variant="contained" color='primary' disabled={!editing || loading} className={(!editing || loading) ? "disabled-btn confirm-btn": 'submit-btn confirm-btn'} onClick={handleSubmit}>{loading ? <CircularProgress size={20}/> : "Update"}</Button>
        </Box>
      </Box>
    </Header>
  );
};

export default Profile;
