import axios from "axios";
import SummaryApi, { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
});

// Attach access token to each request
Axios.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("accesstoken");

    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors and refresh token
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshtoken = localStorage.getItem("refreshtoken");

      if (refreshtoken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshtoken);

          if (newAccessToken) {
            // Update header with new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the original request with new token
            return Axios(originalRequest);
          }
        } catch (err) {
          console.error("Token refresh failed", err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh access token
const refreshAccessToken = async (refreshtoken) => {
  try {
    const response = await axios({
      ...SummaryApi.RefreshToken,
      headers: {
        Authorization: `Bearer ${refreshtoken}`,
      },
    });

    const newAccessToken = response.data.data.accesstoken;
    localStorage.setItem("accesstoken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export default Axios;
