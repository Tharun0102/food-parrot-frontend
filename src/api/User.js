import axios from "axios";
import { BASE_URL } from "../constants/constants";


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
    throw Error(err.message || "something went wrong!");
  }
}