import { Layout, Menu, theme, Row, Col } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import { ReactComponent as Vector } from '../../assets/images/Vector.svg';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import './style.css';
import Profile from '../../components/avatar/profile';
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Garage', '1', <Vector />),
  getItem('Garage owner', '2', <Vector />),
  getItem('Garage services', '3', <Vector />),
];

const useProfileClick = () => {
  const navigate = useNavigate();
  const onClick = ({ key }) => {
    switch (key) {
      case '1':
        navigate('/garage');
        break;
      case '2':
        navigate('/garage-owner');
        break;
      case '3':
        navigate('/garage-services');
        break;
      default:
        break;
    }
  };
  return onClick;
};

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentMenuItem = items.find(item => `/${item.key}` === location.pathname.substr(1));

  const renderPageTitle = () => {
    if (currentMenuItem) {
      if (currentMenuItem.key === '1') {
        return 'Garage';
      } else if (currentMenuItem.key === '2') {
        return 'Garage Owner';
      } else if (currentMenuItem.key === '3') {
        return 'Garage Services';
      }
    }

    const currentPath = window.location.pathname;
    if (currentPath === '/change-password') {
      return 'Change Password';
    }
    if (currentPath === '/' || currentPath === '/update-profile') {
      return 'My Profile';
    }

    return null;
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16 }}>
          <p style={{ color: '#8767E1' }}>Menu</p>
        </div>
        <Menu theme="light" mode="inline" items={items} onClick={useProfileClick()} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row>
            <Col md={21}>
              {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>
            <Col md={3}>
              {currentMenuItem && currentMenuItem.key === '4' ? null : <Profile />}
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ margin: '16px 0' }}>
            {renderPageTitle() && (
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: 32,
                  display: currentMenuItem && ['1', '2', '3', '4'].includes(currentMenuItem.key) ? 'none' : 'block',
                }}
              >
                {renderPageTitle()}
              </h1>
            )}
          </div>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;