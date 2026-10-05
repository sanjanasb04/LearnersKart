import axios from 'axios';

// Dynamically resolve API host between Localhost and Hostinger Production
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5001/api';
    }
    // Professional custom subdomain API on Hostinger
    return 'https://api.learnerskart.com/api';
  }
  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 8000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken = null;

export const getAccessToken = () => accessToken;

export const setAccessTokenInClient = (token) => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${getApiBaseUrl()}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        setAccessTokenInClient(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessTokenInClient(null);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
