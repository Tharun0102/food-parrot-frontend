import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const getAllRestaurants = async (search) => {
  try {
    const resp = await axios.get(`${BASE_URL}/restaurant/all`, { params: { search } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}

export const getRestaurant = async (restaurantId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/restaurant/${restaurantId}`)
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}

export const getMenuItems = async (restaurantId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/restaurant/${restaurantId}/all`)
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}