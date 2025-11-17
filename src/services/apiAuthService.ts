import apiClient from '../lib/axios';

export type RegisterData = {
  role: 'siswa' | 'pembimbing';
  username: string;
  email: string;
  password: string;
  password_confirm: string;
};

type RegisterResponse = {
  userId: string;
  email: string;
  message: string;
};

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userId: string;
  email: string;
  token: string; 
};


export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', data);
  
  return response.data;
};