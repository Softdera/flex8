import { createStore } from 'redux';
import cartReducer from './reducers'; // Ensure you export the reducer from this file

const store = createStore(cartReducer);

export default store;
