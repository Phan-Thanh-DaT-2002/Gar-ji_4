import '../avatar/style.css'
import { Dropdown, Space, Avatar, Typography, message } from 'antd';
import { ReactComponent as Ellipse1 } from '../../assets/images/Ellipse 1.svg';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // do something on component mount
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === '4') {
      localStorage.removeItem('token');
      message.info('Logged out');
      navigate('/login');
    } else {
      // handle other menu items
    }
  };

  const menu = (
    <Dropdown
      menu={{
        items: [
          {
            label: 'View profile',
            key: '1',
          },
          {
            label: 'Update profile',
            key: '2',
          },
          {
            label: 'Change password',
            key: '3',
          },
          {
            label: 'Log out',
            key: '4',
          },
        ],
        onClick: handleMenuClick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div style={{ display: 'flex' }}>
            <div>
              <Avatar size="default" icon={<Ellipse1 />} />
            </div>
            <div
              style={{
                margin: '0px 3px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Text strong>Ha Nguyen</Text>
              <Text type="secondary">Admin</Text>
            </div>
          </div>
        </Space>
      </a>
    </Dropdown>
  );

  return menu;
};

export default Profile;