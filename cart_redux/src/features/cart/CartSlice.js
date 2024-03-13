import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItemsAPI, updateItemAPI, deleteItemAPI, addItemAPI } from "./CartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async () => {
    const response = await fetchItemsAPI();
    return response.data;
  }
);

export const AddItemAsync = createAsyncThunk(
  "cart/AddItem",
  async (item) => {
    const {id,title,brand,thumbnail,price} = item;
    const response = await addItemAPI({id,title,brand,thumbnail,price,quantity:1});
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    await deleteItemAPI(id);
    return id;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch Items
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
    // Add Item
      .addCase(AddItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
    // Delete Item
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item)=>item.id===action.payload)
        state.items.splice(index,1);
      });
  },
});

// export const { } = cartSlice.actions;

export default cartSlice.reducer;
