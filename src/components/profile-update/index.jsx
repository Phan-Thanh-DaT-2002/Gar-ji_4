import React from 'react';
import { theme } from 'antd';

function ProfileUpdate(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      style={{
        padding: 24,
        minHeight: 500,
        background: colorBgContainer,
      }}
    ></div>
  );
}
export default ProfileUpdate;
