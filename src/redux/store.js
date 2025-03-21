import { createStore } from 'redux';
import cartReducer from './cartReducer.js';

const store = createStore(cartReducer);

export default store;
