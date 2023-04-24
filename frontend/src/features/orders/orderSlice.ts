import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantModel } from "../../Models/RestaurantModel";
import orderService from "./orderService";

interface OrderState {
    restaurants: RestaurantModel[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderState = {
  restaurants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getRestaurants = createAsyncThunk("restaurantsOrder/getAll", async (_, thunkAPI: any) => {
  try {
    return await orderService.getRestaurants();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(getRestaurants.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getRestaurants.fulfilled, (state, action: PayloadAction<RestaurantModel[]>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.restaurants = action.payload;
          })
          .addCase(getRestaurants.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });
    }
})

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;