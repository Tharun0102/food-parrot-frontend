import axios from 'axios';

import { BASE_URL } from '../constants/constants';

export const UserSignup = () => {
  return axios.post(`${BASE_URL}/auth/signup`)
}

export const UserLogin = () => {
  return axios.post(`${BASE_URL}/auth/signup`)
}

export const RestaurantSignup = () => {
  return axios.post(`${BASE_URL}/auth/signup`)
}

export const RestaurantLogin = () => {
  return axios.post(`${BASE_URL}/auth/signup`)
}