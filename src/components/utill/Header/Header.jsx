import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.scss';
import If from '../If/If';
import { UpdateClientUser, UpdateRestaurantUser } from '../../../store/actions/User';
import { RESTAURANT, USER } from '../../../constants/constants';

const Header = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const isLogged = user?.isLogged; 

  const handleSubmit = ()=>{
    if(page==='signup'){
      history.push(`/login/${params.type || USER}`)
    }else{
      history.push(`/signup/${params.type || USER}`)
    }
  }

  const handleOrders = () => {

  }

  const goToHome = () =>{
    !isLogged && history.push('/')
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
          <Typography className="header-logo" onClick={goToHome}>INSTAFOOD</Typography>
        </Box>
        <Box display="flex" alignItems="center" className="header-right">
          <If condition={isLogged && params.type==USER}>
            <Typography>Hello, {user.name}</Typography>
            <Button onClick={handleOrders}>
              Orders
            </Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </If>
          <If condition={!isLogged}>
            <If condition={page==='signup' || page==='login'}>
              {page==='signup' && <Button className="auth-btn" onClick={handleSubmit}>Login</Button> }
              {page==='login' && <Button className="auth-btn" onClick={handleSubmit}>Register</Button> }
            </If>
            <If condition={page!=='signup' && page!=='login'}>
              <Button className="auth-btn" onClick={handleSubmit}>Login</Button> 
              <Button className="auth-btn" onClick={handleSubmit}>Register</Button> 
            </If>
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
