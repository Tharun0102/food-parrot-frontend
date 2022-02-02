import React, { useEffect, useState } from 'react';
import Header from '../../utill/Header/Header';
import NavBar from '../../utill/NavBar/NavBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import If from '../../utill/If/If';
import emptyList from '../../../images/empty-list.png';
import { toast } from 'react-toastify';
import './menuItems.scss';
import MenuItem from '../../utill/MenuItem/MenuItem';
import ItemModal from './ItemModal';
import { getMenuItems } from '../../../api/Restaurant';
import { useSelector } from 'react-redux';
import { deleteMenuItem, editMenuItem } from '../../../api/MenuItem';

const MenuItems = () => {
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [itemModal, setItemModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      const items = await getMenuItems(user._id);
      setItems(items)
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteMenuItem(itemId, user.token);
      fetchItems();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Header page='menuItems'>
      <NavBar tab='menuItems'>
        {itemModal && <ItemModal
          itemModal={itemModal}
          setItemModal={setItemModal}
          fetchItems={fetchItems}
        />}
        <Box display="flex" flexDirection="column" alignItems="center">
          <If condition={items.length > 0}>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap="20px" className='items-list'>
              {
                items.map(item => <MenuItem key={item._id} data={item} isRestaurant handleDeleteItem={handleDeleteItem} fetchItems={fetchItems} />)
              }
            </Box>
          </If>
          <If condition={items.length === 0}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="noData-container">
              <img className='empty-cart-icon' src={emptyList} alt="empty-cart" />
              <Typography className="empty-text">No Items available!</Typography>
            </Box>
          </If>
          <Button variant='contained' className='addItem-btn' onClick={() => setItemModal(true)}>ADD ITEM</Button>
        </Box>
      </NavBar>
    </Header>
  );
};

export default MenuItems;
