import axios from 'axios';
import { BASE_URL } from '../common/constants';
import { errorHandler } from './common';

export const editMenuItem = async (itemId, payload, token) => {
  console.log(itemId, payload, token);
  try {
    const resp = await axios.post(`${BASE_URL}/menuItem/${itemId}`, payload, { headers: { 'x-auth-token': token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const deleteMenuItem = async (itemId, token) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/menuItem/${itemId}`, { headers: { 'x-auth-token': token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}


