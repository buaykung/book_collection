import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '../store';
import { loginUser, registerUser, logout, clearError } from '../store/authSlice';
import { LoginRequest, RegisterRequest } from '../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, token, isLoading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );

  // 🔐 Login Function
  const login = async (credentials: LoginRequest) => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      router.push('/books');
    }
    return result;
  };

  // 📝 Register Function
  const register = async (userData: RegisterRequest) => {
    const result = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(result)) {
      router.push('/books');
    }
    return result;
  };

  // 🚪 Logout Function
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // ❌ Clear Error Function
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};