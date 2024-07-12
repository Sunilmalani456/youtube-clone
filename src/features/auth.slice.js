import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authStatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        state.user = null;
        state.authStatus = false;
      } else {
        state.user = action.payload;
        state.authStatus = true;
      }
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;
export default authSlice.reducer;
