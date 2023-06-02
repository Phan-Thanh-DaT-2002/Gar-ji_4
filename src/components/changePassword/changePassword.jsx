import { Button, Form, Input, theme } from 'antd';
import { useState } from 'react';
import React from 'react';
import './style.css';
import changePasswordAPI from './ChangePasswordAPI';



const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const ChangePassword = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    if (newPassword === confirmPassword) {
      console.log('Form values:', currentPassword);
      console.log('Form values:', newPassword);


      // Gọi API để thay đổi mật khẩu
      changePasswordAPI(currentPassword, newPassword);
    }
    else alert("mật khâủ mới nhập vào không khớp")
  }

  const [requiredMark, setRequiredMarkType] = useState('');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      className="content_div"
      style={{
        padding: 24,
        minHeight: 360,
        Width: 100,
        background: colorBgContainer,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={onFinish}
      >
        <p className="text">
          Now you can create a new password for your acconut
        </p>
        <p className="text-btn">Current Password</p>
        <Form.Item name="currentPassword">
          <Input
            label='currentPassword'
            placeholder="Enter current password"

          />
        </Form.Item>
        <p className="text-btn">New Password</p>
        <Form.Item name="newPassword">
          <Input
            label='newPassword'
            placeholder="Enter new password"

          />
        </Form.Item>
        <p className="text-btn">Confirm Password</p>
        <Form.Item name="confirmPassword">
          <Input
            label='confirmPassword'
            placeholder="Enter confirm password"

          />
        </Form.Item>
        <div className="line"></div>
        <Form.Item {...tailLayout}>
          <div className="btn-c-s">
            <Button
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
              }}
              htmlType="submit"
            >
              Save
            </Button>
            <Button
              style={{
                color: '#8767E1',
              }}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ChangePassword;
