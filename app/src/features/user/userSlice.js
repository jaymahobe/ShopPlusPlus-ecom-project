import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
  loggedUserInfo: null,
  userOrders: [],
  status: "idle",
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  "user/fetchLoggedInUserInfo",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUserInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectLoggedInUserInfo = (state) => state.user.loggedUserInfo;
export const { increment } = userSlice.actions;

export default userSlice.reducer;
