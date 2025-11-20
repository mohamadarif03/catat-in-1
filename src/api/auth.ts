import api from "./axios";


export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
    const response = await api.post("/auth/login", payload);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
}

export type SignUpPayload = {
  email: string;
  username: string;
  role: string;
  password_confirm : string;
  password: string;
};

export async function signup(payload: SignUpPayload) {
    const response = await api.post("/auth/signup", payload);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
}