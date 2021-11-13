import React from 'react';
import Box from '@mui/material/Box';
// import background from '../../../images/welcome-background.png';
import './welcome.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';


const Welcome = () => {

  const history = useHistory();


  return (
    <Box className="home">

      <Box className="company">
        <Typography className="company-name" variant="h1" component="h2" >
          <i>INSTA<span>FOOD</span></i>
        </Typography>
        <Typography className="tag">
          Order Here & Get the food instantly.
        </Typography>

        <Box className="users">
          <Button
            variant="contained"
            className="user-btn"
            onClick={() => { history.push("/signup/restaurant") }}
          >
            Add Restaurant
          </Button>
          <Button
            variant="contained"
            className="user-btn"
            onClick={() => { history.push("/signup/user") }}
          >
            Make Order
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Welcome;
