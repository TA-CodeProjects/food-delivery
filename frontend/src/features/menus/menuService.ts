import axios from "axios";
import { MenuModel, MenuPayloadModel } from "../../Models/RestaurantModel";

const API_URL = "/api/restaurants/";

const getMenuItems = async (id: string, token: string) => {
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };

     const response = await axios.get(API_URL + id, config);
     return response.data
}

const createMenuItem = async (menuData: MenuPayloadModel, id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + id, menuData, config);

  return response.data;
};

const deleteMenuItem = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + 'menu/' + id, config);

  return response.data;
};

const updateMenuItem = async (menuData: MenuModel, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "menu/" + menuData.id,menuData, config);

  return response.data;
};

const menuService = {
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
};

export default menuService;