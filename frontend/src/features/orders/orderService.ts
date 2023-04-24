import axios from "axios";

const API_URL = "api/orders/";

const getRestaurants = async () => {
    const response = await axios.get(API_URL)
    return response.data
}


const orderService = {
  getRestaurants,
};

export default orderService;