import axios from 'axios';

// Create an axios instance pre-configured for the backend API
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
