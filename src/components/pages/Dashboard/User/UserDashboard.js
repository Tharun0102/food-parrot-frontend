import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import emptyList from '../../../../images/empty-list.png';
import Restaurant from './components/Restaurant';
import CircularProgress from '@mui/material/CircularProgress';
import './userDashboard.scss'
import Cart from '../../Cart/Cart';
import Header from '../../../utill/Header/Header';
import If from '../../../utill/If/If';
import { getAllRestaurants } from '../../../../api/Restaurant';

const UserDashboard = () => {
  const [input, setInput] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [])

  const handleSearch = async () => {
    setFetching(true);
    try {
      const updatedRestaurants = await getAllRestaurants(input);
      setRestaurants(updatedRestaurants);
      setFetching(false);
    } catch (err) {
      alert(err.message);
      setFetching(false);
    }
  }


  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  return (
    <Header>
      <Box display="flex" className='dashboard-wrapper'>
        <Box className="user-dashboard" flexGrow="1">
          <Box className="restaurants-search">
            <OutlinedInput
              placeholder="Search for Restaurant or it's area"
              type="text"
              className="input-field"
              value={input.name}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeypress}
            />
            <Button variant="contained" className="search-btn" onClick={handleSearch}>Search</Button>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" className="restaurants-list-container">
            <If condition={fetching}>
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
                <CircularProgress />
              </Box>
            </If>
            <If condition={!fetching}>
              {
                restaurants?.length > 0 &&
                <Box className="restaurants-list">
                  {restaurants.map((item, index) =>
                    <Restaurant
                      key={item.id}
                      data={item}
                    />
                  )}
                </Box>
              }
              {
                restaurants?.length === 0 &&
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
                  <img className="empty-list-icon" src={emptyList} alt="empty-list" />
                  <Typography className="empty-text">No Restaurants Found!, type a restaurant or area</Typography>
                </Box>
              }
            </If>
          </Box>
        </Box>
        <Cart />
      </Box>
    </Header>
  )
}

export default UserDashboard
