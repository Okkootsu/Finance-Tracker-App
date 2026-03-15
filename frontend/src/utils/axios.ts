import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

interface FailedRequestQueue {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequestQueue[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: "http://localhost:5114/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// if accessToken expires check for resfresh token if it exists, override failed calls's accessToken with new one and call them again
// if it doesn't exists cancel all the calls and logout the user
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // take the failed call
    const originalRequest = error.config;

    // if call is not repeated (_retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // if refreshing process still going then put the new call in queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // first failed call fetched, start the refreshing process
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // directly using axios for not falling in loop
        const refreshResponse = await axios.post(
          "http://localhost:5114/api/Auth/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // update the accessToken while preserving the current user
        useAuthStore
          .getState()
          .setAuth(newAccessToken, useAuthStore.getState().user!);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // make the api call again with the new accessToken
        return api(originalRequest);
      } catch (refreshError) {
        // if refreshToken is not valid or expired
        processQueue(refreshError as Error, null);

        useAuthStore.getState().logout();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // throw other errors as usual (except 401 - Unauthorized)
    return Promise.reject(error);
  },
);

export default api;
