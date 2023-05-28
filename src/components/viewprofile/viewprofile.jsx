import React, { useEffect, useState } from 'react';
import { theme, Button, Avatar, Typography } from 'antd';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import './style.css';
import { useNavigate,useLocation } from 'react-router-dom';

const { Text } = Typography;

function ViewProfile() {
  const navigate = useNavigate();
  const location = useLocation(); // Sử dụng useLocation từ react-router-dom
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null)
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
          "http://localhost:1337/api/users/me?populate=role",
          requestOptions
        );
        const result = await response.json();

        if (response.ok) {
          console.log(result);
          setData(result);
          setUserId(result.id); // Lưu ID người dùng vào biến địa phương
        } else {
          console.error('Error:', result);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    navigate('/update-profile', { state: { data, role: data.role.name, userId: userId } });
  };

  if (!data) {
    return null; // Hiển thị một số gì đó trong quá trình tải dữ liệu
  }
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
      }}
    >
      <div className="profile">
        <div className="avatar_view">
          <Avatar size={250} icon={<Ellipse2 />} />
        </div>
        <div className="infor_view">
          <div>
            <Text type="secondary">Name</Text>
            <br />
            <Text strong>{data.fullname}</Text>
          </div>
          <div>
            <Text type="secondary">Email</Text>
            <br />
            <Text strong>{data.email}</Text>
          </div>
          <div>
            <Text type="secondary">Phone Number</Text>
            <br />
            <Text strong>{data.phoneNumber}</Text>
          </div>
          <div>
            <Text type="secondary">DOB</Text>
            <br />
            <Text strong>{data.dob}</Text>
          </div>
          <div>
            <Text type="secondary">Address</Text>
            <br />
            <Text strong>{data.address}</Text>
          </div>
          <div>
            <Text type="secondary">Role</Text>
            <br />
            <Text strong>{data.role.name}</Text>
          </div>
        </div>
      </div>
      <div className="button">
        <Button
          className="update-btn"
          onClick={() => handleClick(1)}
          type="primary"
          style={{
            background: '#8767E1',
            marginRight: '10px',
          }}
        >
          Update Profile
        </Button>
        <Button
          className="change-password-btn"
          onClick={() => handleClick(2)}
          style={{
            color: '#8767E1',
          }}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
}

export default ViewProfile;