// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
interface initialStateInterface {
  user: true | null;
}

const initialState: initialStateInterface = {
  user: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signResolved: (state) => {
      state.user = true;
    },
    signRejected: (state) => {
      state.user = null;
    },
  },
});

export const { signResolved, signRejected } = adminSlice.actions;
export default adminSlice.reducer;
