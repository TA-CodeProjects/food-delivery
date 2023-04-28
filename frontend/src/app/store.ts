import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import restaurantReducer from "../features/restaurants/restaurantSlice";
import menuReducer from "../features/menus/menuSlice";
import orderReducer from "../features/orders/orderSlice";
import orderRestaurantReducer from "../features/orderRestaurant/orderRestaurantSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    restaurants: restaurantReducer,
    menus: menuReducer,
    orders: orderReducer,
    orderRestaurant: orderRestaurantReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch