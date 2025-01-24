import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Spin } from 'antd';

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
