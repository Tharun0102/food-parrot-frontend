import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import validate from './Validate';
import { useParams } from 'react-router-dom';
import background from '../../../images/auth-background.png';
import Header from '../../utill/Header/Header';
import { GoogleLogin } from 'react-google-login';

import './style.scss';

const Signup = () => {

  const params = useParams();
  const history = useHistory();

  console.log(params);

  let defaultInput = {
    name: '',
    password: ''
  }
  let defaultErrors = {
    name: '',
    password: ''
  }
  if (params.type === 'restaurant') {
    defaultInput.restaurantName = '';
    defaultInput.address = '';
    defaultErrors.restaurantName = '';
    defaultErrors.address = '';
  }
  const [input, setInput] = useState(defaultInput);
  const [errors, setErrors] = useState(defaultErrors);

  const USER_TYPE = 'user';
  const RESTAURANT_TYPE = 'restaurant';

  useEffect(() => {
    if (params.type !== USER_TYPE && params.type !== RESTAURANT_TYPE) {
      history.push("/");
    }
    console.log(process.env);
  }, [])

  const handleSubmit = () => {
    const updatedErrors = validate(input);
    if (Object.keys(updatedErrors).length > 0) {
      setErrors(updatedErrors);
      return;
    }
    //signup
  }

  const handleSuccess = async (res) => {
    console.log("success", res);
  }

  const handleFailure = async (res) => {
    console.log("fail", res);
  }

  return (
    <Box className="auth-container" style={{ backgroundImage: `url(${background})` }}>
      <Header page="signup" />
      <Typography className="title">{params.type === 'user' ? 'Customer Registration' : 'Restaurant Registration'}</Typography>
      <Box className="form-inputs" display="flex" justifyContent="space-around" alignItems="center" minWidth="50%">
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
          <Box className="input-container">
            <Typography className="label">username:</Typography>
            <OutlinedInput
              placeholder="Username"
              type="text"
              className={`input-field ${errors.name === '' ? '' : "input-error"}`}
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            {errors.name !== '' && <span className="error-msg">{errors.name}</span>}
          </Box>
          <Box className="input-container">
            <Typography className="label">Password:</Typography>
            <OutlinedInput
              placeholder="Password"
              type="text"
              className={`input-field ${errors.password === '' ? '' : "input-error"}`}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            {errors.password !== '' && <span className="error-msg">{errors.password}</span>}
          </Box>
        </Box>
        {params.type === RESTAURANT_TYPE &&
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
            <Box className="input-container">
              <Typography className="label">Restaurant Name:</Typography>
              <OutlinedInput
                placeholder="name"
                type="text"
                className={`input-field ${errors.restaurantName === '' ? '' : "input-error"}`}
                value={input.restaurantName}
                onChange={(e) => setInput({ ...input, restaurantName: e.target.value })}
              />
              {errors.restaurantName !== '' && <span className="error-msg">{errors.restaurantName}</span>}
            </Box>
            <Box className="input-container">
              <Typography className="label">Address:</Typography>
              <OutlinedInput
                placeholder="Password"
                type="text"
                className={`input-field ${errors.address === '' ? '' : "input-error"}`}
                value={input.address}
                onChange={(e) => setInput({ ...input, address: e.target.value })}
              />
              {errors.address !== '' && <span className="error-msg">{errors.address}</span>}
            </Box>
          </Box>
        }
      </Box>

      <Button
        variant="contained"
        color="primary"
        className="submit-btn"
        onClick={handleSubmit}
      >
        Register
      </Button>
      <Typography className="text">OR</Typography>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        buttonText="Continue with Google"
        className="google-auth-btn"
      />
    </Box >
  )
}

export default Signup
