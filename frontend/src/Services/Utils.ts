import { MenuModel } from "../Models/RestaurantModel";

export const getTotal = (cart: MenuModel[]) => {
  let totalQuantity: number = 0;
  let totalPrice: number = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });
  return { totalPrice, totalQuantity };
};