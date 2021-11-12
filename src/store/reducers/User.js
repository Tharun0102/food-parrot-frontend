import { UPDATE_CLIENT, UPDATE_RESTAURANT } from '../constants';
const InitialState = {
  RestaurantState: {},
  ClientState: {}
}

const userReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_RESTAURANT:
      return {
        ...state,
        ...payload
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        candidateName: "",
        ...payload
      };
    default:
      return state;
  }
};

export default userReducer;