import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';
import MenuItem from '../../utill/MenuItem/MenuItem';
import Cart from '../Cart/Cart';
import Header from '../../utill/Header/Header';
import { getMenuItems, getRestaurant } from '../../../api/Restaurant';
import If from '../../utill/If/If';
import CircularProgress from '@mui/material/CircularProgress';
import emptyList from '../../../images/empty-list.png';
import './style.scss'
import { toast } from 'react-toastify';
import { Image } from 'cloudinary-react';

const RestaurantHome = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const restaurantId = params.id;
    try {
      setFetching(true);
      const restaurantDetails = await getRestaurant(restaurantId);
      setData(restaurantDetails);

      const menuItems = await getMenuItems(restaurantId);
      setMenuItems(menuItems);
      setFetching(false);
    } catch (err) {
      toast.error(err.message);
      setFetching(false);
    }
  }

  return (
    <Header>
      <Box display="flex" style={{ overflowX: 'hidden' }}>
        <Box className="restaurant-home" flexGrow="1">
          <Box>
            <If condition={fetching}>
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
                <CircularProgress />
              </Box>
            </If>
            <If condition={!fetching}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" flexDirection="column" className='restaurant-details'>
                  <div className='restaurant-logo'>
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={data?.imageId}
                      crop="scale"
                    />
                  </div>
                  <Box className='details-wrapper'>
                    <Typography className='name'>{data?.name}</Typography>
                    <Typography className='description'>{data?.desription || "No Description available!"}</Typography>
                    <Typography className='address'>{data?.address?.street + ", " + data?.address?.city + ", " + data?.address?.zip}</Typography>
                  </Box>
                </Box>
                <Typography className='menuItems-title'>Menu Items</Typography>
                {
                  menuItems.length > 0 &&
                  <Box display="flex" gap="20px" justifyContent="center" alignItems="center" flexWrap="wrap" className="menuItems-list">
                    {
                      menuItems.map((item, index) => {
                        return <MenuItem key={index} data={item} restaurantName={data?.name} />
                      })
                    }
                  </Box>
                }
                {
                  menuItems.length === 0 &&
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow="1" className="noData-container">
                    <img className="empty-list-icon" src={emptyList} alt="empty-list" />
                    <Typography className="empty-text">No Items Found!</Typography>
                  </Box>
                }
              </Box>
            </If>
          </Box>
        </Box>
        <Cart />
      </Box>
    </Header>
  )
}

export default RestaurantHome
