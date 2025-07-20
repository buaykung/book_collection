
'use client';
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getProfile } from '../store/authSlice';

interface AuthContextType {
  // Context methods can be added here if needed
}

const AuthContext = createContext<AuthContextType>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // 🔄 Auto-login on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token && !isAuthenticated) {
      // ตรวจสอบ token และดึงข้อมูล user
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);