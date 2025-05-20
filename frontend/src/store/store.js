import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/ProductSlice.js";
import authReducer from "../store/AuthSlice.js"
import cartReducer from "../store/CartSlice.js" 
import orderReducer from "../store/OrderSlice.js"

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
