import api from './api';

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    createdAt: number;
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

interface RegisterResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  async updateProfile(data: { name: string; avatar: string }) {
    const response = await api.put('/auth/profile', data);
    return response.data.user;
  },
};