import React from 'react';
import Header from '../../utill/Header/Header'
import NavBar from '../../utill/NavBar/NavBar'

import './scheduled.scss';

const scheduled = () => {
  return (
    <Header>
      <NavBar tab='scheduled'>
        <div>scheduled</div>
      </NavBar>
    </Header>
  );
};

export default scheduled;
