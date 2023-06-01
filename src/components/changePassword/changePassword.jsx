import { Button, Form, Input, theme, message } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';




const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback('Please enter the password!');
  } else if (value.length < 6) {
    callback('Enter a password of 6 characters!');
  } else if (!/[a-z]/.test(value)) {
    callback('Enter a password with lowercase characters!');
  } else if (!/[A-Z]/.test(value)) {
    callback('Enter a password with uppercase characters!');
  } else if (!/[!@#$%^&*]/.test(value)) {
    callback('Enter a password with special characters!');
  } else {
    callback();
  }
};

const ChangePassword = () => {

  const navigate = useNavigate();
  const handCancel = () => {
    navigate('/');
  }


  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    if (newPassword === confirmPassword) {
      var raw = JSON.stringify({
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      });

      const jwt = localStorage.getItem('jwt');
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${jwt}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      console.log(jwt);
      console.log(raw);

      fetch('http://localhost:1337/api/auth/change-password', requestOptions)
        .then(response => {
          if (response.ok) {
            message.success('change password successfully!');
            navigate('/');
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    else alert("new password does not match")



  }

  const [userData, setUserData] = useState([]);

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
        <Form.Item
          name="currentPassword"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}>
          <Input.Password
            label='currentPassword'
            placeholder="Enter current password"

          />
        </Form.Item>




        <p className="text-btn">New Password</p>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}>
          <Input.Password
            label='newPassword'
            placeholder="Enter new password"
          />
        </Form.Item>



        <p className="text-btn">Confirm Password</p>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}>
          <Input.Password
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
              onClick={handCancel}
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

