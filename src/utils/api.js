import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // withCredentials: true, // 쿠키 포함 시 true
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
