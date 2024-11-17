import axios from "axios";

const API_KEY = "1836eb21d80b44f281d70421241711";
const BASE_URL = "http://api.weatherapi.com/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export default axiosInstance;
