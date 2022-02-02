import React from 'react';
import './footer.scss';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' className='footer-wrapper' id='footer-wrapper'>
      <Typography className='contact-us-text'>Contact us</Typography>
      <Box display='flex' alignItems='center' gap='20px' className='contact-info-section'>
        <Typography className='contact-info'>
          <HomeIcon />
          D.No 10-93, Durga Nagar, Piler Town, Chittor, Andhra Pradesh, 517214
        </Typography>
        <Typography className='contact-info'>
          <PhoneIcon />
          <p>+91 9885712725</p>
        </Typography>
        <Box className='contact-info'>
          <MailIcon />
          <a className='mail-link' href="mailto:tharun.foodparrot@gmail.com">tharun.foodparrot@gmail.com</a>
        </Box>
      </Box>
      <Box>
        © 2022 Food Parrot | All Rights Reserved
      </Box>
    </Box>
  );
};

export default Footer;
