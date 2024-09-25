import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create();

// Add an interceptor to set the JWT token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = 'Bearer '+ token;
      debugger
      console.log(config.headers['Authorization'])
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;