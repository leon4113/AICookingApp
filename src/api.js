import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.19.35.144:3000', // Adjust this URL based on your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
