import axios from "axios";
import { CredentialsModel, RegisterModel } from "../../Models/AuthModel";

const API_URL = "api/users/";

const register = async (userData: RegisterModel) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const login = async (userData: CredentialsModel) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
