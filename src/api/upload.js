import axios from "axios";
import { BASE_URL } from "../common/constants";


export const imageUpload = async (payload) => {
  try {
    const resp = await axios.post(`${BASE_URL}/upload`,
      payload,
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
    throw Error(err.message || "something went wrong!");
  }
}