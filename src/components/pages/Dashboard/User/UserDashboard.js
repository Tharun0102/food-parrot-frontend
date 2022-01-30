import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import emptyList from '../../../../images/empty-list.png';
import Restaurant from './components/Restaurant';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import './userDashboard.scss'
import Cart from '../../Cart/Cart';
import Header from '../../../utill/Header/Header';
import If from '../../../utill/If/If';
import { getAllRestaurants } from '../../../../api/Restaurant';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [input, setInput] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 12;
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    handleSearch();
  }, [page])

  const handleSearch = async () => {
    setFetching(true);
    try {
      const resp = await getAllRestaurants({
        page,
        limit: 12,
        search: input
      });
      setTotal(resp.total)
      setRestaurants(resp.restaurants);
      setFetching(false);
    } catch (err) {
      toast.error(err.message);
      setFetching(false);
    }
  }


  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  return (
    <Header page='dashboard'>
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
                <Box display="flex" flexDirection="column" alignItems="center" gap="30px">
                  <Box className="restaurants-list">
                    {restaurants.map((item, index) =>
                      <Restaurant
                        key={item.id}
                        data={item}
                      />
                    )}
                  </Box>
                  <Pagination color='primary' count={Math.floor((total + PAGE_SIZE - 1) / PAGE_SIZE)} page={page} onChange={handleChange} />
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
