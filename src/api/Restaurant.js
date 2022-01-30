import axios from 'axios';
import { BASE_URL } from '../common/constants';
import { errorHandler } from './common';

export const getAllRestaurants = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/restaurant/all`, payload)
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
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
    errorHandler(err);
  }
}

export const getRestaurantStats = async (restaurantId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/restaurant/${restaurantId}/stats`)
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const editRestaurant = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/restaurant/${payload.restaurantId}`,
      payload,
      {
        headers: {
          'x-auth-token': payload.token
        }
      })
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
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
    errorHandler(err);
  }
}

export const addMenuItem = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/restaurant/${payload.restaurantId}/addItem`, payload,
      {
        headers: {
          'x-auth-token': payload.token
        }
      })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

