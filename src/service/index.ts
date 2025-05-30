import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

http.interceptors.response.use((response) => {
  return response.data;
});
