import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/ProductsSlice';

export const store = configureStore({
  reducer: {
    counter: productsReducer,
  },
});
