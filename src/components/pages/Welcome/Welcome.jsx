import React from 'react';
import Box from '@mui/material/Box';
import Header from '../../utill/Header/Header';
import './welcome.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Redirect, useHistory } from 'react-router-dom';
import homeImage from './images/home-page-image.jpg'
import { useSelector } from 'react-redux';

const Welcome = () => {
  const history = useHistory();
  const user = useSelector((state)=>state.user);
  
  if(user?.isLogged){
    return <Redirect to={`/dashboard/${user.userType}`}/>
  }

  return (
    <Header page="welcome">
      <Box display="flex" justifyContent="center" alignItems="center" className="home">
        <Box display="flex" flexDirection="column" gap="30px" className="company">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography className="company-name" >
              <i><span>FOOD PARROT</span></i>
            </Typography>
            <Typography className="tag">
              Order now & Get your favourite food delivered instantly.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" gap="20px" className="home-footer">
            <Button
              variant="contained"
              className="user-btn"
              onClick={() => { history.push("/signup/Restaurant") }}
            >
              Add Your Restaurant
            </Button>
            <Button
              variant="contained"
              className="user-btn"
              onClick={() => { history.push("/dashboard/User") }}
            >
              Order Now
            </Button>
          </Box>
        </Box>
        <Box className="home-image-wrapper">
          <img src={homeImage} alt="home-page-icon"/>
        </Box>
      </Box>
    </Header>
  )
}

export default Welcome;
