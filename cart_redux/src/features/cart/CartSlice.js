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

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async ({item,change})=>{
    const {id} = item
    // console.log(id)
    // console.log(change)
    const response = await updateItemAPI(id, change);
    const data = response.data
    // console.log(data)
    // console.log(item)
    const newItem = {...item, ...data};
    // console.log(newItem)
    return newItem;
  }
)

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
      })
      // Update Item
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        console.log(index)
        state.items.splice(index,1,action.payload);
      });
  },
});

// export const { } = cartSlice.actions;

export default cartSlice.reducer;
