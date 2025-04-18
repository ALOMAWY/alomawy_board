// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { adminAuthSlice } from "./adminAuth";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthSlice.reducer,
  },
});
