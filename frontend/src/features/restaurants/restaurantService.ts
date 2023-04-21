import axios from "axios";
import { RestaurantPayloadModel } from "../../Models/RestaurantModel";

const API_URL = "api/restaurants/";

const createRestaurant = async (restaurantData: RestaurantPayloadModel, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, restaurantData, config);

  return response.data;
};

const getRestaurants = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteRestaurant = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}


const restaurantsService = {
  createRestaurant,
  getRestaurants,
  deleteRestaurant,
};

export default restaurantsService;
