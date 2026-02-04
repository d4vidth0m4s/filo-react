import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7065', // Replace with your API base URL
  timeout: 10000,
});

api.interceptors.request.use(config => {
 const token = localStorage.getItem('authToken');
 
 if (token) config.headers.Authorization = `Bearer ${token}`;
 

  return config;
});