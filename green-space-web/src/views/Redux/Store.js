import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"; // Đường dẫn tới CartSlice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Giảm thiểu cartSlice vào store
  },
});
