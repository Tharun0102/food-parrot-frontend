import React from 'react';
import Header from '../../utill/Header/Header';
import NavBar from '../../utill/NavBar/NavBar';
import './history.scss'

const history = () => {
  return (
    <Header>
      <NavBar tab='history'>
        <div>History</div>
      </NavBar>
    </Header>
  );
};

export default history;
