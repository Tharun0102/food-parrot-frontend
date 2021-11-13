import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import BackIcon from '../../../images/back-icon.svg';
import './style.scss';

const Header = ({ page }) => {
  const params = useParams();
  const history = useHistory();

  const handleSubmit = ()=>{
    if(page==='signup'){
      history.push(`/login/${params.type}`)
    }else{
      history.push(`/signup/${params.type}`)
    }
  }

  return (
    <Box className="header-container">
      <Box className="header-left">
        {(page==='signup' || page==='login')&& 
          <img 
            className="back-btn" 
            src={BackIcon} 
            alt="logo or back button"
            onClick={()=>history.push('/')}
          />
        }
      </Box>
      <Box className="header-right">
        {page==='signup' && <Button className="auth-btn" onClick={handleSubmit}>Login</Button> }
        {page==='login' && <Button className="auth-btn" onClick={handleSubmit}>Register</Button> }
      </Box>
    </Box>
  )
}

export default Header
