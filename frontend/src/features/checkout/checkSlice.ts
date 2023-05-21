import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCartModel } from "../../Models/RestaurantModel";
import checkoutService from "./checkoutService";

interface checkoutState {
    checkout: MenuCartModel[];
}

const initialState: checkoutState = {
    checkout: [],
};

export const sendToCheckout = createAsyncThunk(
  "checkout/send",
  async (id: string, thunkAPI: any) => {
    try {
      const cart = thunkAPI.getState().cart.cart;
      return await checkoutService.checkout(id, cart);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
   
  }
});