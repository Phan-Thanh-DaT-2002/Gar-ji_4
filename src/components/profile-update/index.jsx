import React from 'react';
import { theme, Avatar } from 'antd';
import { ReactComponent as Ellipse3 } from '../../assets/images/Ellipse 3.svg';

function ProfileUpdate(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        padding: 24,
        height: '100vh',
        minHeight: '100%',
        background: colorBgContainer,
      }}
    >
      <div>
        <Avatar size="" icon={<Ellipse3 />}></Avatar>
      </div>
    </div>
  );
}
export default ProfileUpdate;
