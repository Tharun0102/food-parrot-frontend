import { UPDATE_CLIENT, UPDATE_RESTAURANT } from '../constants'

export const UpdateRestaurantUser = (payload) => {
  return {
    type: UPDATE_RESTAURANT,
    payload
  }
}

export const UpdateClientUser = (payload) => {
  return {
    type: UPDATE_CLIENT,
    payload
  }
}