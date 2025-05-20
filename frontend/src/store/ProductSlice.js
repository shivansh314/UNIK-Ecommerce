import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchVolaProducts,
  fetchWomenProducts,
  fetchMenProducts,
  // fetchProductById
} from "../api/Product.js";

// Async thunk for fetching Vola products
export const getVolaProducts = createAsyncThunk(
  "products/getVolaProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchVolaProducts();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk for fetching Women's products
export const getWomenProducts = createAsyncThunk(
  "products/getWomenProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchWomenProducts();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk for fetching Men's products
export const getMenProducts = createAsyncThunk(
  "products/getMenProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchMenProducts();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



const productSlice = createSlice({
  name: "products",
  initialState: {
    volaProducts: [],
    womenProducts: [],
    menProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling Vola Products
      .addCase(getVolaProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVolaProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.volaProducts = action.payload;
      })
      .addCase(getVolaProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling Women's Products
      .addCase(getWomenProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWomenProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.womenProducts = action.payload;
      })
      .addCase(getWomenProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling Men's Products
      .addCase(getMenProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.menProducts = action.payload;
      })
      .addCase(getMenProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

  },
});

export default productSlice.reducer;
