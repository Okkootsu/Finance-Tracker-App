import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5114/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// if token is expired then remove token and send user to auth page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default api;