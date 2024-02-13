import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  checkUser,
  updateUser,
  logOutUser,
  checkJwtAuth,
  changePasswordRequest,
} from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  checkedAuth: false,
  error: null,
  changePassword: false,
  changePasswordError: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkJwtAuthAsync = createAsyncThunk(
  "user/checkJwtAuth",
  async () => {
    const response = await checkJwtAuth();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const changePasswordRequestAsync = createAsyncThunk(
  "user/changePasswordRequest",
  async (user) => {
    const response = await changePasswordRequest(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const logOutUserAsync = createAsyncThunk("user/logOutUser", async () => {
  const response = await logOutUser();
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearUser: (state) => {
      state.loggedInUser = null;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(logOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(checkJwtAuthAsync.pending, (state) => {
        state.checkStatus = "loading";
      })
      .addCase(checkJwtAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.checkedAuth = true;
      })
      .addCase(checkJwtAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.checkedAuth = true;
      })
      .addCase(changePasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.changePassword = true;
        state.changePasswordError = null;
      })
      .addCase(changePasswordRequestAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.changePassword = false;
        state.changePasswordError = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoggedInError = (state) => state.auth.error;
export const selectCheckedAuth = (state) => state.auth.checkedAuth;
export const selectUserAuthStatus = (state) => state.auth.status;

export const selectChangePassError = (state) => state.auth.changePasswordError;
export const selectChangePassStatus = (state) => state.auth.changePassword;

export default userSlice.reducer;
