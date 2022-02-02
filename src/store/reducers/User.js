import { LOGOUT, UPDATE_CLIENT, UPDATE_RESTAURANT } from '../../common/constants';
const InitialState = {}

const userReducer = (state = InitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_RESTAURANT:
      return {
        ...payload
      };
    case UPDATE_CLIENT:
      return {
        ...payload
      };
    case LOGOUT:
      return InitialState
    default:
      return state;
  }
};

export default userReducer;