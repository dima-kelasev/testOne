import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/use-auth';
import LoginPage from '../pages/login-page/LoginPage';
import RegisterPage from '../pages/register-page/RegisterPage';
import ResetPassword from '../pages/reset-password/ResetPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import { Spin } from 'antd';
import NewPasswordPage from '../pages/new-password/NewPasswordPage';
import style from './index.module.css';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={style.spinnerStyles}>
        <Spin size="large" />
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/set-new-password/:token" element={<NewPasswordPage />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
    </Routes>
  );
};

export default AppRouter;
