import React from 'react';
import Header from '../../utill/Header/Header';
import NavBar from '../../utill/NavBar/NavBar';
import './requests.scss';

const requests = () => {
  return (
    <Header>
      <NavBar tab='requests'>
        <div>Requests</div>
      </NavBar>
    </Header>
  );
};

export default requests;
