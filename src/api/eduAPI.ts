import axios from "axios";

const eduAPI = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

eduAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token_2");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default eduAPI;
