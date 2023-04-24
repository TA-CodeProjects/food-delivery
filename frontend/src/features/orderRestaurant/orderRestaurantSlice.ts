import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantOrderModel } from "../../Models/RestaurantModel";
import orderRestaurantService from "./orderRestaurantService";

interface OrderRestaurantState {
  restaurant: RestaurantOrderModel;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderRestaurantState = {
  restaurant: {
    name: "",
    description: "",
    deliveryTime: "",
    deliveryCost: 0,
    image: "",
    menus: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getRestaurant = createAsyncThunk(
  "orderRestarant/getOne",
  async (id: string, thunkAPI) => {
    try {
      return await orderRestaurantService.getRestaurant(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderRestaurantSlice = createSlice({
    name: "orderRestaurant",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurant.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRestaurant.fulfilled, (state, action: PayloadAction<RestaurantOrderModel>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.restaurant = action.payload
            })
            .addCase(getRestaurant.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const { reset } = orderRestaurantSlice.actions;
export default orderRestaurantSlice.reducer;
