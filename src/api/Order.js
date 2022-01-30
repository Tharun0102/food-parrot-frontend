import axios from "axios";
import { BASE_URL } from '../common/constants';
import { errorHandler } from "./common";

export const createOrder = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/order/create`, payload, { headers: { 'x-auth-token': payload.token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
  }
}

export const editOrder = async (payload, orderId, token) => {
  try {
    const resp = await axios.post(`${BASE_URL}/order/${orderId}`, payload, { headers: { 'x-auth-token': token } })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      throw Error(resp.data.error || "something went wrong!");
    }
  } catch (err) {
    errorHandler(err);
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
    errorHandler(err);
  }
}