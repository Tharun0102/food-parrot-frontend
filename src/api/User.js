import axios from "axios";
import { BASE_URL } from "../common/constants";
import { errorHandler } from "./common";

export const verifyToken = async (token) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/verifyToken`, { token })
    if (resp.status === 200) {
      return resp?.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}


export const editUser = async (payload, userId, token) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/${userId}/edit`,
      payload,
      {
        headers: {
          'x-auth-token': token
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