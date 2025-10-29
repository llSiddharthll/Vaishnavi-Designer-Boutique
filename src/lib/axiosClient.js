// lib/axiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // e.g. http://localhost:5000/api
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Clear auth state
      localStorage.removeItem('token');
      delete api.defaults.headers.common["Authorization"];
      
      // Redirect with return URL if not already on login page
      if (!window.location.pathname.includes('/login')) {
        const returnUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?redirect=${returnUrl}`;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
