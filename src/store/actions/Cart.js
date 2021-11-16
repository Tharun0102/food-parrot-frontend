
export const AddCartItem = (payload) => {
  return {
    type: 'ADD_ITEM',
    payload
  }
}

export const RemoveCartItem = (payload) => {
  return {
    type: 'REMOVE_ITEM',
    payload
  }
}