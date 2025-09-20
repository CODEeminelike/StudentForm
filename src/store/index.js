// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentReducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});
