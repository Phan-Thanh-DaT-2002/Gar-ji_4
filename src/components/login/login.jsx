import { Button, Checkbox,Form, Input, message } from 'antd';
import React, { useState } from 'react'
import {DivStyle, FormItem, FormStyle, HeadingLogin,Label,MainLogin, InforLogin,FormItemBtn, StyleBtn} from './login'
import { useNavigate } from 'react-router-dom';
const handleLoginSuccess = (jwt) => {
  localStorage.setItem('jwt', jwt);
  const jwtUpdatedEvent = new CustomEvent('jwtUpdated');
  window.dispatchEvent(jwtUpdatedEvent);
};
const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// const validateEmail = (rule, value) => {
//   // Sử dụng biểu thức chính quy để kiểm tra định dạng email
//   const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
//   if (value && !emailPattern.test(value)) {
//     return Promise.reject('Hãy nhập email!');
//   }
//   return Promise.resolve();
// };

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

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Gửi yêu cầu đăng nhập và nhận JWT từ phản hồi
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Nếu đăng nhập thành công, gọi hàm handleLoginSuccess và truyền JWT
        handleLoginSuccess(data.jwt);
        navigate('/');
      } else if (response.status === 404 && data.message === 'User not found') {
        message.error('Email not found');
      } else {
        message.error('An error occurred');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred');
    }
  };

  return (
    <DivStyle >
      <FormStyle
    className='form_login'
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={handleSubmit}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <HeadingLogin>
        <div className="wel_login">
            Welcome
        </div>
        <div className="tit_login">
            Log in to your account     
        </div>
    </HeadingLogin>
    <MainLogin>
    <InforLogin>

    <FormItem
      label={<Label>Email</Label>}
      labelCol={{span:24}}
      name="identifier"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
        // {
        //     validator: validateEmail, 
        // },
      ]}
    >
      <Input />
    </FormItem>

    <FormItem
      label={<Label>Password</Label>}
      labelCol={{span:24}}
      name="password"
      rules={[
        {
          required: true,
          validator: validatePassword,
        },
      ]}
    >
  
      <Input type='password'/>
    </FormItem>
    </InforLogin>

    <FormItem>
      <StyleBtn type="" htmlType="submit">
        <span>Log in</span>
      </StyleBtn>
    </FormItem>
    {error && <div>{error}</div>}
    </MainLogin>
  </FormStyle>
    </DivStyle>
  )
}