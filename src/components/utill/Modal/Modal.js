import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './modal.scss';

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className="custom-modal">
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal
