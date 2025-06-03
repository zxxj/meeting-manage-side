import axios from 'axios';
import { message } from 'antd';

export const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    let { data, config } = error;

    if (data.code === 401 && !config.url.includes('user/admin/refresh')) {
      const res = await refreshToken();

      if (res.status === 200 || res.status === 201) {
        return http(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } else {
      return error.response;
    }
  },
);

async function refreshToken() {
  const res = await http.get('/user/admin/refresh', {
    params: {
      refresh_token: localStorage.getItem('refreshToken'),
    },
  });
  localStorage.setItem('accessToken', res.data.access_token);
  localStorage.setItem('refreshToken', res.data.refresh_token);
  return res;
}
