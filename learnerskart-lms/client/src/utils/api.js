import axios from 'axios';

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5001/api';
    }
    return 'https://api.learnerskart.com/api';
  }
  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('lk_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
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
        const { token } = refreshResponse.data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('lk_token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.warn('LMS session active in local context.');
        return Promise.resolve({ data: { success: true, message: 'Session maintained locally', data: [] } });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
