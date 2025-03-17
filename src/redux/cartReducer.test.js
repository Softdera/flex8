import cartReducer from './cartReducer.js';

describe('cartReducer', () => {
  it('should return the initial state by default', () => {
    const newState = cartReducer(undefined, { type: '@@INIT' });
    expect(newState).toEqual({ cart: [] });
  });

  it('should add a product to the cart', () => {
    const product = { id: 1, name: 'T-Shirt', price: 19.99 };
    const action = { type: 'ADD_TO_CART', payload: product };
    const newState = cartReducer(undefined, action);
    expect(newState.cart).toEqual([product]);
  });

  it('should remove a product from the cart', () => {
    const initialState = { cart: [{ id: 1 }, { id: 2 }] };
    const action = { type: 'REMOVE_FROM_CART', payload: 1 };
    const newState = cartReducer(initialState, action);
    expect(newState.cart).toEqual([{ id: 2 }]);
  });
});
