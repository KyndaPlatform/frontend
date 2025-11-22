// src/lib/api.js
import axios from 'axios';

// ✅ Dynamically determine base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ALWAYS use hosted backend
  withCredentials: true,
});

// ✅ Attach JWT token from localStorage to every request
API.interceptors.request.use((req) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('⚠️ Invalid token in localStorage');
  }

  return req;
});

export default API;