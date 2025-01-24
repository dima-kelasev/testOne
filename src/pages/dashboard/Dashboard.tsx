/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Menu, Button } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import style from './dashboard.module.css';
import { DEFAULT_ITEMS } from '../../const/items';

const { Header, Content } = Layout;

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const goToLoginPage = () => navigate('/login');

  const logOutHandle = () => {
    logout();
    goToLoginPage();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      goToLoginPage();
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Header className={style.DashboardHeader}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={DEFAULT_ITEMS}
        />
        <Button onClick={logOutHandle}>Выйти</Button>
      </Header>
      <Content className={style.DashboardContent}>
        <h2>Добро пожаловать в систему!</h2>
      </Content>
    </Layout>
  );
};

export default Dashboard;
