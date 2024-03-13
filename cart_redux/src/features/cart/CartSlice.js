import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, updateItem, deleteItem, addItem } from "./CartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);

export const AddItemAsync = createAsyncThunk(
  "cart/AddItem",
  async (item) => {
    const response = await addItem(item);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(AddItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      });
  },
});

// export const { } = cartSlice.actions;

export default cartSlice.reducer;
