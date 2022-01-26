import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import decode from 'jwt-decode';
import './style.scss';
import If from '../If/If';
import { Logout, UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';
import {  USER } from '../../../constants/constants';

const Header = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const isLogged = user?.isLogged; 

  useEffect(()=>{
      const token = user?.token;
      if(token){
          const decodedToken = decode(token)
          console.log(decodedToken.exp,new Date().getTime());
          if(decodedToken.exp*1000 < new Date().getTime()){
            dispatch(Logout());
          }
      }
  },[window.location])

  const handleRegisterClick = ()=>{
    history.push(`/signup/${user?.userType|| USER}`)
  }

  const handleLoginClick = ()=>{
    history.push(`/login/${user?.userType|| USER}`)
  }

  const handleOrders = () => {
    history.push('/orders');
  }

  const goToHome = () =>{
    !isLogged && history.push('/');
    isLogged && history.push(`/dashboard/${user?.userType}`);
  }
  
  const handleLogout = () => {
    const action = (user?.userType == USER) ? UpdateClientUser({}) : UpdateRestaurantUser({});
    console.log("action",action);
    dispatch(action);
    history.push('/')
  }

  return (
    <Box className='main-page'>
      <Box className="header-container">
        <Box display="flex" alignItems="center" className="header-left">
          <If condition={!isLogged}>
            {(page==='signup' || page==='login') &&
              <IconButton color="primary" className="back-btn" onClick={()=>history.push('/')} component="span">
                <ArrowBackIcon />
              </IconButton> 
            }
          </If>
          <Typography className="header-logo" onClick={goToHome}> <img src="/app-logo.png" className='app-logo'/>FOOD PARROT</Typography>
        </Box>
        <Box display="flex" alignItems="center" className="header-right">
          <If condition={isLogged}>
            {user?.userType==USER && <Typography className='header-item'>Hello, {user.name}</Typography>}
            {user?.userType==USER && <Typography className='header-item header-btn' onClick={handleOrders}>
              Orders
            </Typography>}
            <Typography className='header-item header-btn' onClick={() => history.push('/profile')}>
              Profile
            </Typography>
            {user?.userType==USER && <Button variant="outlined" className='logout-btn' onClick={handleLogout}>
              Logout
            </Button>}
          </If>
          <If condition={!isLogged && page !=='login' && page!=='signup'}>
            <Button className="auth-btn" onClick={handleLoginClick}>Login</Button> 
            <Button className="auth-btn" onClick={handleRegisterClick}>Register</Button> 
          </If>
        </Box>
      </Box>
      <Box className='page-content'>
        {props.children}
      </Box>
    </Box>
  )
}

export default Header
