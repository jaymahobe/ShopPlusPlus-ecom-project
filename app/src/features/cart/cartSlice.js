import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemfromCart,
  fetchCartItemsByUserId,
  resetCart,
  updateQuantity,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  isAdded: false,
  isLoading: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);

    return response.data;
  }
);
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async (update) => {
    const response = await updateQuantity(update);

    return response.data;
  }
);
export const deleteItemfromCartAsync = createAsyncThunk(
  "cart/deleteItemfromCart",
  async (itemId) => {
    const response = await deleteItemfromCart(itemId);

    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.items.unshift(action.payload);
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(updateQuantityAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // getting by id (index)
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItemfromCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemfromCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // getting by id (index)
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export const { removeItem } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectState = (state) => state.cart;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
