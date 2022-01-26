import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import validate from './Validate';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Header from '../../utill/Header/Header';
import { GoogleLogin } from 'react-google-login';
import { USER, RESTAURANT } from '../../../constants/constants';

import './style.scss';
import { RestaurantLogin, UserLogin } from '../../../api/auth';
import { UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';

const Login = () => {

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(params);

  let defaultInput = {
    email: '',
    password: ''
  }
  let defaultErrors = {
    email: '',
    password: ''
  }
  const [input, setInput] = useState(defaultInput);
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.type !== USER && params.type !== RESTAURANT) {
      history.push("/");
    }
    console.log(process.env);
  }, [])

  const handleSubmit = async () => {
    const updatedErrors = validate(input);
    let isValid = true;
    Object.keys(updatedErrors).forEach((key) => {
      if (updatedErrors[key].length > 0) isValid = false;
    })
    setErrors(updatedErrors);
    if (!isValid) return;
    //login
    setLoading(true);
    let payload = { ...input };
    try {
      if (params.type === USER) {
        const resp = await UserLogin(payload);
        setLoading(false);
        dispatch(UpdateClientUser({ ...resp.data, isLogged: true, userType: USER, 'x-auth-token': resp.headers['x-auth-token'] }));
        history.push('/dashboard/User');
      } else {
        const resp = await RestaurantLogin(payload);
        setLoading(false);
        console.log(resp, resp.headers, resp.headers['x-auth-token']);
        dispatch(UpdateRestaurantUser({ ...resp.data, isLogged: true, userType: RESTAURANT, 'x-auth-token': resp.headers['x-auth-token'] }));
        history.push('/dashboard/Restaurant');
      }
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  }

  const goToSignupPage = () => {
    history.push(`/signup/${params.type}`)
  }

  return (
    <Header page="login">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="auth-container" >
        <Typography className="title">{params.type === USER ? 'Customer Login' : 'Restaurant Login'}</Typography>
        <Box className="form-inputs" display="flex" justifyContent="space-around" alignItems="center" minWidth="50%">
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
            <Box className="input-container">
              <TextField
                id="filled-search"
                label="email"
                className='input-field'
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                error={errors.email !== ''}
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
                error={errors.password !== ''}
                helperText={errors.password}
                variant='standard'
              />
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Login"}
        </Button>
        <Typography className="alternate-text">Don't have an account yet? <span className='special-link' onClick={goToSignupPage}>Signup</span></Typography>
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

export default Login;
