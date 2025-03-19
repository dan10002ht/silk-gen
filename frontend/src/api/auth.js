import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  register: async userData => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async ({ email, password, rememberMe }) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password, rememberMe });
    if (response.data.token) {
      const storageMethod = rememberMe ? localStorage : sessionStorage;
      storageMethod.setItem('token', response.data.token);
      storageMethod.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
};
