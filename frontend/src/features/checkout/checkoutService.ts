import axios from "axios";
import { MenuCartModel } from "../../Models/RestaurantModel";
import { store } from "../../app/store";

const API_URL = "/api/checkout/";

const checkout = async (id: string, itemsData: MenuCartModel[]) =>{
  const token = store.getState().auth.user?.token;
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
     };

     const orderData = { restaurantId: id, itemsData, config };

     const response = await axios.post(API_URL, orderData);

     return response.data
}

const checkoutService = {
  checkout,
};

export default checkoutService;