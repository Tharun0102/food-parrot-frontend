import axios from "axios";
import { BASE_URL } from '../constants/constants';

export const createOrder = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/order/create`, payload, { headers: { 'x-auth-token': payload.token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}

export const editOrder = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/order/edit`, payload, { headers: { 'x-auth-token': payload.token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}

export const getAllOrders = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/order/all`, payload, { headers: { 'x-auth-token': payload.token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    throw Error(err.message || "something went wrong!");
  }
}