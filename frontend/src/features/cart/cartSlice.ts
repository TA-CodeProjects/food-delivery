import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCartModel, MenuModel } from "../../Models/RestaurantModel";
import cartService from "../checkout/checkoutService";

interface cartState {
  cart: MenuModel[];
}

const initialState: cartState = {
  cart: [],
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => initialState,
    addToCart: (state, action: PayloadAction<MenuModel>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item!.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item?.quantity === 1) {
        item.quantity = 1;
      } else {
        item!.quantity--;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const { reset, addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
