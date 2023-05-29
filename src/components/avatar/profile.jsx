import { Dropdown, Space, Avatar, Typography, theme } from 'antd';
import { ReactComponent as Ellipse1 } from '../../assets/images/Ellipse 1.svg';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../avatar/style.css';

const { Text } = Typography;

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

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };

        const response = await fetch(
          'http://localhost:1337/api/users/me?populate=role',
          requestOptions
        );
        const result = await response.json();

        if (response.ok) {
          console.log(result);
          setData(result);
          setUserId(result.id);
        } else {
          console.error('Error:', result);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = ({ key }) => {
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/update-profile', {
          state: { data, role: data.role.name, userId: userId },
        });
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

  if (!data) {
    return null; // Return null or a loading indicator while data is being fetched
  }

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleProfileClick,
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
              <Text strong>{data.fullname}</Text>
              <Text type="secondary">{data.role.name}</Text>
            </div>
          </div>
        </Space>
      </a>
    </Dropdown>
  );
}

export default Profile;
