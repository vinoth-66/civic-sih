// Custom hook for API calls using Axios
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8080'; // Will be replaced with actual backend URL

export const useAxios = () => {
  const { user } = useAuth();

  // Set up axios interceptor for authentication
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axios;
};

// Custom hook for API requests with loading and error states
export const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios[method](url, data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading, error };
};