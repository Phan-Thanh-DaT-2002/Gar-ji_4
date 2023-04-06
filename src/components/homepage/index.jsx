import { Breadcrumb, Layout, Menu, theme, Row, Col, Avatar } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ReactComponent as Vector } from '../../assets/images/Vector.svg';
import { ReactComponent as Ellipse1 } from '../../assets/images/Ellipse 1.svg';
import { useState } from 'react';
import React from 'react';
import './style.css';

import ProfileUpdate from '../profile-update';

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
  getItem('Garage staff', '3', <Vector />),
  getItem('Garage services', '4', <Vector />),
];
const HomePage = () => {
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
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
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
            <Col md={18}>
              {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>
            <Col md={6}>
              <div>
                <Avatar size="default" icon={<Ellipse1 />}></Avatar>
                <span>
                  <b>Ha Nguyen</b>
                  <span>Admin</span>
                </span>
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>{<h1>My Profile</h1>}</Breadcrumb.Item>
          </Breadcrumb>
          <ProfileUpdate />
        </Content>
      </Layout>
    </Layout>
  );
};
export default HomePage;
