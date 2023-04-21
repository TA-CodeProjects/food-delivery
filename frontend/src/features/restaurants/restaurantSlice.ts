import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantModel, RestaurantPayloadModel } from "../../Models/RestaurantModel";
import restaurantsService from "./restaurantService";

interface RestaurantState {
  restaurants: RestaurantModel[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: RestaurantState = {
  restaurants: [],
  isError: false,
  isSuccess: false, 
  isLoading: false,
  message: "",
};

export const createRestaurant = createAsyncThunk(
  "restaurant/create",
  async (restaurantData: RestaurantPayloadModel, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await restaurantsService.createRestaurant(restaurantData, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRestaurants = createAsyncThunk("restaurant/getAll", async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await restaurantsService.getRestaurants(token);
  } catch (error: any) {
     const message =
       (error.response && error.response.data && error.response.data.message) ||
       error.message ||
       error.toString();
     return thunkAPI.rejectWithValue(message);
  }
})

export const deleteRestaurant = createAsyncThunk("restaurant/delete", async (id: string, thunkAPI: any ) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await restaurantsService.deleteRestaurant(id, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})


export const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRestaurant.fulfilled, (state, action: PayloadAction<RestaurantModel>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.restaurants.push(action.payload);
      })
      .addCase(createRestaurant.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
         state.restaurants = state.restaurants.filter(
           (restaurant) => restaurant.id !== action.payload
         );
      })
      .addCase(deleteRestaurant.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
