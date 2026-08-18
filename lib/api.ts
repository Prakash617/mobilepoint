import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for authentication, etc.)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    let token: string | null = null;
    try {
      const raw = localStorage.getItem('mobilepoint_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        token = parsed?.state?.accessToken ?? null;
      }
    } catch {
      // ignore malformed persisted state
    }
    if (!token) {
      token = localStorage.getItem('token');
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized');
    }
    return Promise.reject(error);
  }
);