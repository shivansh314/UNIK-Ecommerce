import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    // Fix: Correct thunkAPI placement
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/order/getallorders"
      );

      return response.data; // Ensure it's an array
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  // Handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Ensure action.payload is an array
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
