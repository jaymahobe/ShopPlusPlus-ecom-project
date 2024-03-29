import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishList,
  deleteItemFromWishlist,
  fetchWishlistByUserId,
} from "./wishListAPI";

const initialState = {
  wishlist: [],
  status: "idle",
  isAdded: false,
  isLoading: false,
};

export const addToWishListAsync = createAsyncThunk(
  "cart/addToWishlist",
  async (item) => {
    const response = await addToWishList(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchWishlistByUserIdAsync = createAsyncThunk(
  "cart/fetchWishlistByUserId",
  async (userId) => {
    const response = await fetchWishlistByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromWishlistAsync = createAsyncThunk(
  "cart/deleteItemFromWishlist",
  async (itemId) => {
    const response = await deleteItemFromWishlist(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(addToWishListAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishListAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.wishlist.push(action.payload);
      })
      .addCase(fetchWishlistByUserIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(deleteItemFromWishlistAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // getting by id (index)
        const index = state.wishlist.findIndex(
          (e) => e.id === action.payload.id
        );
        state.wishlist.splice(index, 1);
      });
  },
});

export const { removeItem } = wishListSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlist;
export const selectState = (state) => state.wishlist;

export default wishListSlice.reducer;
