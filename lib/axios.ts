import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', // Base URL for CRUST
  timeout: 10000, // Timeout after 10 seconds
});

// Example: Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Optionally add headers or modify the request
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example: Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('Axios Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
