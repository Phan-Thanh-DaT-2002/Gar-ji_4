import { Layout, Menu, theme, Row, Col } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import { ReactComponent as Vector } from '../../assets/images/Vector.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './style.css';

import Profile from '../../components/avatar/profile';
import { Outlet } from 'react-router-dom';
// import CreateManager from '../../components/GarageManagement/Create/Create_manager.jsx';
import CreateServices from '../../components/GarageServices/GarageServicesCreate/Create_services';
import Create from '../../components/GarageOwner/Garage-owner-create/Create.jsx';
import OwnerUpdate from '../../components/GarageOwner/Garage-owner-update/OwnerUpdate.jsx';
import UpdateMana from '../../components/GarageManagement/UpdateManagement/UpdateMana';
import UpdateServices from '../../components/GarageServices/GarageServicesUpdate/UpdateServices';
// import ProfileUpdate from '../../components/profile-update';
// import ChangePassword from '../../components/changePassword/changePassword';

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
          }}
        >
          <p style={{ color: '#8767E1' }}>Menu</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={useProfileClick()}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col md={21}>
              {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>
            <Col md={3}>
              <Profile></Profile>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              margin: '16px 0',
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                fontSize: 32,
              }}
            >
              My Profile
            </h1>
          </div>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default HomeLayout;
