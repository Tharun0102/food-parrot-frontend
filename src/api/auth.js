import axios from 'axios';

import { BASE_URL } from '../common/constants';
import { errorHandler } from './common';

export const UserSignup = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/register`, payload)
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const UserLogin = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/login`, payload)
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const RestaurantSignup = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/restaurant/register`, payload)
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const RestaurantLogin = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/restaurant/login`, payload)
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}