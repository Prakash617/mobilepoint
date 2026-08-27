import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/authStore';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Required so the browser stores/sends the Django session cookie (used for
  // server-side refresh-token storage during token refresh).
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Unauthenticated axios instance for guest endpoints (no auth interceptor)
export const guestApi = axios.create({
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

// Response interceptor: on 401, silently refresh the access token using the
// server-side session refresh token, then retry the original request. Only the
// access token is used by the client; the refresh token lives in the Django
// session (session cookie), so no client-side refresh token is needed.
let isRefreshing = false;
let pending: Array<(token: string) => void> = [];
let pendingReject: Array<(err: unknown) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number })
      | undefined;

    // Handle 429 Too Many Requests with retry + backoff
    if (
      error.response?.status === 429 &&
      original &&
      !original._retry
    ) {
      const retryCount = original._retryCount ?? 0;
      const maxRetries = 3;
      if (retryCount < maxRetries) {
        original._retryCount = retryCount + 1;
        const retryAfter = error.response?.headers?.['retry-after'];
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : 1000 * 2 ** retryCount;
        await new Promise((r) => setTimeout(r, delay));
        return api(original);
      }
    }

    // Handle 401 Unauthorized - refresh token
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes('/auth/refresh/')
    ) {
      if (isRefreshing) {
        // Queue requests while a refresh is already in flight.
        return new Promise((resolve, reject) => {
          pending.push((token: string) => {
            if (original.headers) {
              original.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(original));
          });
          pendingReject.push(reject);
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post<{ access: string }>(
          '/auth/refresh/',
          {}
        );
        const token = data.access;
        useAuthStore.getState().setAuth(token);
        if (original.headers) {
          original.headers.Authorization = `Bearer ${token}`;
        }
        pending.forEach((cb) => cb(token));
        return api(original);
      } catch (refreshError) {
        pendingReject.forEach((cb) => cb(refreshError));
        useAuthStore.getState().clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        pending = [];
        pendingReject = [];
      }
    }
    return Promise.reject(error);
  }
);