import axios from "axios";
import SummaryApi, { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Request Interceptor: Attach Access Token
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and Refresh Token
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshtoken");
      if (refreshToken) {
        try {
          const response = await axios({
            ...SummaryApi.RefreshToken,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (response.data?.success) {
            const newAccessToken = response.data?.data?.accesstoken;

            // Save new token and retry original request
            localStorage.setItem("accesstoken", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return Axios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          // Redirect to login or logout user
        }
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
