import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logInAction: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },

    logOutAction: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logInAction, logOutAction } = accountSlice.actions;
export default accountSlice.reducer;
