import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './ProductsAPI';

const initialState = {
  products: [],
  status: 'idle',
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (amount) => {
    const response = await fetchProducts()
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

// export const { } = productsSlice.actions;


export default productsSlice.reducer;
