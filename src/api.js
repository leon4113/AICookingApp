import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cooking-backend-ca04538a2942.herokuapp.com', // Adjust this URL based on your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
