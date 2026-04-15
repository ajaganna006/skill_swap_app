import axios from "axios";
import API_CONFIG from "../config/apiConfig"; // adjust path if needed

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;