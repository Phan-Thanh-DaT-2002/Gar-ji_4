import { Dropdown, Space, Avatar, Typography } from 'antd';
import { ReactComponent as Ellipse1 } from '../../assets/images/Ellipse 1.svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../avatar/style.css';

const { Text } = Typography;
const useProfileClick = () => {
  const navigate = useNavigate();
  const onClick = ({ key }) => {
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/update-profile');
        break;
      case '3':
        navigate('/change-password');
        break;
      case '4':
        navigate('/login');
        break;
      default:
        break;
    }
  };
  return onClick;
};
const items = [
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
];
const Profile = () => (
  <Dropdown
    menu={{
      items,
      onClick: useProfileClick(),
    }}
  >
    <a onClick={e => e.preventDefault()}>
      <Space>
        <div
          style={{
            display: 'flex',
          }}
        >
          <div>
            <Avatar size="default" icon={<Ellipse1 />}></Avatar>
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

export default Profile;
