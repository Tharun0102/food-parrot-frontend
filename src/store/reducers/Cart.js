
const defaultState = []

const CartReducer = (state = defaultState, action) => {
  console.log("cart reducer", action);
  const newState = [...state];
  const item = action.payload;
  switch (action.type) {
    case 'ADD_ITEM':
      if (newState.length === 0 || newState[0].Restaurant !== item.Restaurant) {
        return [{ ...item, count: 1 }];
      }
      const listItem = newState.find((e) => e._id === item._id);
      if (listItem) {
        listItem.count++;
      } else {
        newState.push({
          ...item,
          count: 1
        })
      }
      return newState;
    case 'REMOVE_ITEM':
      if (newState.length === 0 || newState[0].restaurantId !== item.restaurantId) {
        return newState;
      }
      const listItem2 = newState.find((e) => e._id === item._id);
      if (listItem2?.count <= 1) {
        return newState.filter((e) => e._id !== listItem2._id);
      }
      if (listItem2) {
        listItem2.count--;
      }
      return newState;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export default CartReducer;