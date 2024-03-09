import { JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_KEY, UNAUTHORIZED_EVENT } from '@app/constants';
import type { User } from '@app/types';
import axios from 'axios';

class AuthService {
  constructor() {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          const customEvent = new CustomEvent(UNAUTHORIZED_EVENT);
          window.dispatchEvent(customEvent);
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string) {
    const response = await axios.post(`/login`, { email, password });
    this.setSession(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async register(userData: User & { password: string }) {
    const response = await axios.post(`/register`, userData);
    this.setSession(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  logout() {
    this.setSession(null, null);
  }

  setSession(accessToken: string | null, refreshToken: string | null) {
    if (accessToken && refreshToken) {
      localStorage.setItem(JWT_ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(JWT_REFRESH_TOKEN_KEY, refreshToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
      localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);

      delete axios.defaults.headers.common['Authorization'];
    }
  }
}

export const authService = new AuthService();
