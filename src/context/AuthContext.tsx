import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from '../services/local-storage-service';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
