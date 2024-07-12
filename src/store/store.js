import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // ui: uiSlice,
    // video: videoSlice,
    // channel: channelSlice,
  },
  devTools: false,
});

export default store;
// Compare this snippet from src/pages/auth/sign-in/sign-in.jsx:
