import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import LocalStorageService from './local-storage-service';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = LocalStorageService.getAuthToken();
    setIsAuthenticated(!!token);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = (email: string, password: string): boolean => {
    const user = LocalStorageService.findUserByEmail(email);

    if (!user) return false;

    LocalStorageService.setAuthToken('mockToken123');
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    LocalStorageService.removeAuthToken();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
