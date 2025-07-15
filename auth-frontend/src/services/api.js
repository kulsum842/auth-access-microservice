// services/api.js
import axios from 'axios';

// Create an Axios instance with base config
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Allow sending cookies (important for refresh token)
});

// ================== Request Interceptor ==================
// Attach access token to all outgoing requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================== Response Interceptor ==================
// Automatically refresh access token on 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If request failed with 401 and hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call /refresh-token (refresh token is in HTTP-only cookie)
        const res = await axios.post(
          'http://localhost:5000/api/refresh-token',
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('token', newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);

      } catch (refreshError) {
        console.error('🔁 Refresh token failed:', refreshError.response?.data || refreshError);

        // Clear access token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/'; // or /login if you have a login route
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
