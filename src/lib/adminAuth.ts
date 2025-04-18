// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
});

export const {} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
