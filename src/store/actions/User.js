import { UPDATE_CLIENT, UPDATE_RESTAURANT, LOGOUT } from '../../constants/constants'

export const UpdateRestaurantUser = (payload) => {
  return {
    type: UPDATE_RESTAURANT,
    payload
  }
}

export const Logout = () => {
  return {
    type: LOGOUT,
    payload: {}
  }
}

export const UpdateClientUser = (payload) => {
  return {
    type: UPDATE_CLIENT,
    payload
  }
}