import { UPDATE_CLIENT, UPDATE_RESTAURANT } from '../../constants/constants';
const InitialState = {}

const userReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  console.log("user action", action.payload, type);

  switch (type) {
    case UPDATE_RESTAURANT:
      return {
        ...payload
      };
    case UPDATE_CLIENT:
      return {
        ...payload
      };
    default:
      return state;
  }
};

export default userReducer;