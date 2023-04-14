import React from 'react';
import { theme, Button, Avatar, Typography } from 'antd';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import '../viewprofile/style.css';
const { Text } = Typography;
function ViewProfile() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            <Text strong>Ha Nguyen</Text>
          </div>
          <div>
            <Text type="secondary">Email</Text>
            <br />
            <Text strong>ha.nguyen@gmail.com</Text>
          </div>
          <div>
            <Text type="secondary">Phone Number</Text>
            <br />
            <Text strong>0989 223 345</Text>
          </div>
          <div>
            <Text type="secondary">DOB</Text>
            <br />
            <Text strong>25/01/1992</Text>
          </div>
          <div>
            <Text type="secondary">Address</Text>
            <br />
            <Text strong>Cau Giay, Ha Noi</Text>
          </div>
          <div>
            <Text type="secondary">Role</Text>
            <br />
            <Text strong>Admin</Text>
          </div>
        </div>
      </div>
      <div className="button">
        <Button
          type="primary"
          style={{
            background: '#8767E1',
            marginRight: '10px',
          }}
        >
          Update Profile
        </Button>
        <Button
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
