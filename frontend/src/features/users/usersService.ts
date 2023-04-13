import axios from "axios";

const API_URL = "api/users/";

const getUsers = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteUser = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
};

export default usersService;
