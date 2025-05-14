import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/authStore';

const { Header, Content, Sider } = Layout;

const StaffLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'attendance',
      icon: <Calendar size={20} />,
      label: 'Điểm danh',
      onClick: () => navigate('/staff-attendance'),
    },
    {
      key: 'logout',
      icon: <LogOut size={20} />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          CareNet Staff
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['attendance']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ 
            padding: 24, 
            margin: 0, 
            minHeight: 280,
            background: '#fff',
            borderRadius: '8px'
          }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StaffLayout; 