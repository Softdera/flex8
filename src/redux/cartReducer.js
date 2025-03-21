

const initialCartState = { cart: [] };

export default function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    default:
      return state;
  }
}
