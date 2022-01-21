import axios from 'axios';

import { BASE_URL } from '../constants/constants';

export const UserSignup = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/register`, payload)
    if (resp.status === 200) {
      return resp;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
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
    throw Error(err.message || "something went wrong!");
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
    throw Error(err.message || "something went wrong!");
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
    throw Error(err.message || "something went wrong!");
  }
}