import React from 'react';
import Box from '@mui/material/Box';
import Lottie from 'react-lottie';
import LoadingAnimation from './loading.json';

export default function Loader() {
  const LodingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Lottie
        options={LodingOptions}
        height={400}
        width={400}
        isClickToPauseDisabled
      />
    </Box>
  )
}
