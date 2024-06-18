import axios from 'axios';
import { message } from 'antd';
import { logOutAction } from '../redux/slice/accountSlice';
import store from '../redux/store'; 
import { useNavigate } from 'react-router-dom';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch log out action
      store.dispatch(logOutAction());
      // Display token expired message
      message.error('Token expired. Please log in again.');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
