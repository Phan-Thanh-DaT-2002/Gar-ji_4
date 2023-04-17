import { Button, Form, Input, theme } from 'antd';
import { useState } from 'react';
import React from 'react';
import './style.css';

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const ChangePassword = () => {
  // const labelStyle = {
  //   /* Now you can create a new password for your acconut */

  //   fontFamily: 'Poppins',
  //   fontStyle: 'normal',
  //   fontWeight: 500,
  //   fontSize: 16,
  //   lineHeight: 24,

  //   color: '#939393',
  // };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm();
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
      >
        <p className="text">
          Now you can create a new password for your acconut
        </p>
        <p className="text-btn">Current Password</p>
        <Form.Item>
          <Input placeholder="Enter current password" />
        </Form.Item>
        <p className="text-btn">New Password</p>
        <Form.Item>
          <Input.Password Input placeholder="Enter new password" />
        </Form.Item>
        <p className="text-btn">Confirm Password</p>
        <Form.Item>
          <Input.Password placeholder="Enter confirm password" />
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
