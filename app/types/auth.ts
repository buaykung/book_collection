
export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author'
}

export interface User {
  id: number;
  username: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  
  role?: {
    id: number;
    name: string | null;
    role: UserRole | null;
  };
  
  userRole?: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}