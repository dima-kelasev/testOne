import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/router';
import { Spin } from 'antd';
import { useAuth } from './hook/use-auth';
import { AuthProvider } from './services/auth-provider';

const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <AppRouter />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
