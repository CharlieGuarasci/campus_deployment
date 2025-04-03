import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Or 'http://127.0.0.1:8000/api/'
  withCredentials: true, // if you need cookies/auth
});

export default API;