import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import validate from './Validate';
import TextField from '@mui/material/TextField';
import Header from '../../utill/Header/Header';
import { USER, RESTAURANT } from '../../../common/constants';
import './style.scss';
import { RestaurantSignup, UserSignup } from '../../../api/auth';
import { UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { imageUpload } from '../../../api/upload';
import { toast } from 'react-toastify';

const Signup = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  let defaultInput = {
    name: '',
    password: '',
    password2: '',
    email: '',
    city: '',
    street: '',
    zip: '',
    image: null
  }
  let defaultErrors = {
    name: '',
    password: '',
    password2: '',
    email: '',
    city: '',
    street: '',
    zip: ''
  }

  const [input, setInput] = useState(defaultInput);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (params.type !== USER && params.type !== RESTAURANT) {
      history.push("/");
    }
  }, [])

  const handleSubmit = async () => {
    let testInput = { ...input };
    if (params.type === USER) {
      delete testInput.city;
      delete testInput.street;
      delete testInput.zip;
      delete testInput.image;
    }
    const updatedErrors = validate(testInput);
    let isValid = true;
    Object.keys(updatedErrors).forEach((key) => {
      if (updatedErrors[key].length > 0) isValid = false;
    })
    setErrors(updatedErrors);
    if (!isValid) return;

    //signup
    setLoading(true);
    let payload = { ...input };
    try {
      if (params.type === USER) {
        const resp = await UserSignup(payload);
        toast.success("signup successful!")
        setLoading(false);
        dispatch(UpdateClientUser({ ...resp.data, isLogged: true, userType: USER, 'x-auth-token': resp.headers['x-auth-token'] }));
        history.push('/dashboard/User');
      } else {
        if (!input.image) {
          toast.error("image required!");
          setLoading(false);
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
            const resp = await RestaurantSignup(payload);
            setLoading(false);
            dispatch(UpdateRestaurantUser({ ...resp.data, isLogged: true, userType: RESTAURANT, 'x-auth-token': resp.headers['x-auth-token'] }));
            history.push('/dashboard/Restaurant');
          } catch (err) {
            setLoading(false);
            toast.error("image upload failed!")
          }
        };
        reader.readAsDataURL(input.image);
        reader.onerror = () => {
          setLoading(false);
          toast.error('something went wrong!');
        };
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, image: file });
  }

  const goToLoginPage = () => {
    history.push(`/login/${params.type}`)
  }

  return (
    <Header page="signup">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="auth-container" >
        <Typography className="title">{params.type === USER ? 'Customer Registration' : 'Restaurant Registration'}</Typography>
        <Box className="form-inputs" display="flex" justifyContent="space-around" alignItems="center" minWidth="50%">
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
            <Box className="input-container">
              <TextField
                id="filled-search"
                label={params.type === USER ? 'Name' : 'Restaurant Name'}
                className='input-field'
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                error={errors.name?.length > 0}
                helperText={errors.name}
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
                error={errors.email?.length > 0}
                helperText={errors.email}
                variant='standard'
              />
            </Box>
            <Box className="input-container">
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                className='input-field'
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
                error={errors.password?.length > 0}
                helperText={errors.password}
                variant='standard'
              />
            </Box>
            <Box className="input-container">
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                className='input-field'
                value={input.password2}
                onChange={(e) => setInput({ ...input, password2: e.target.value })}
                error={errors.password2?.length > 0}
                helperText={errors.password2}
                variant='standard'
              />
            </Box>
            {params.type === RESTAURANT && <Box className="input-container">
              <TextField
                id="outlined-password-input"
                label="City"
                type="text"
                className='input-field'
                value={input.city}
                onChange={(e) => setInput({ ...input, city: e.target.value })}
                error={errors.city?.length > 0}
                helperText={errors.city}
                variant='standard'
              />
            </Box>}
            {params.type === RESTAURANT && <Box className="input-container">
              <TextField
                id="outlined-password-input"
                label="Street"
                type="text"
                className='input-field'
                value={input.street}
                onChange={(e) => setInput({ ...input, street: e.target.value })}
                error={errors.street?.length > 0}
                helperText={errors.street}
                variant='standard'
              />
            </Box>}
            {params.type === RESTAURANT && <Box className="input-container">
              <TextField
                id="outlined-password-input"
                label="zip"
                type="text"
                className='input-field'
                value={input.zip}
                onChange={(e) => setInput({ ...input, zip: e.target.value })}
                error={errors.zip?.length > 0}
                helperText={errors.zip}
                variant='standard'
              />
            </Box>}
            {params.type === RESTAURANT && <Box className="input-container">
              <input accept='image/*' type="file" className="custom-file-input" onChange={onFileChange} />
              <span className='error-msg'>{errors.imageUrl}</span>
            </Box>}
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Register"}
        </Button>
        <Typography className="alternate-text">Already have an account? <span className='special-link' onClick={goToLoginPage}>Login</span></Typography>
        {/* <Typography className="text">OR</Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          buttonText="Continue with Google"
          className="google-auth-btn"
        /> */}
      </Box >
    </Header>
  )
}

export default Signup
