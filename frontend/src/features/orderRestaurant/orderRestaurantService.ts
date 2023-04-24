import axios from "axios";

const API_URL = "/api/orders/";


const getRestaurant = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const orderRestaurantService = {
  getRestaurant,
};

export default orderRestaurantService;
