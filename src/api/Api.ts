import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:5000', // Replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
 const token = localStorage.getItem('token');
 
 
 if (token) config.headers.Authorization = `Bearer ${token}`;
 

  return config;
});