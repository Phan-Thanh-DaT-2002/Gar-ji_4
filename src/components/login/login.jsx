import { Button, Checkbox,Form, Input, message } from 'antd';
import React, { useState } from 'react'
import {DivStyle, FormItem, FormStyle, HeadingLogin,Label,MainLogin, InforLogin,FormItemBtn, StyleBtn} from './login'
import { useNavigate } from 'react-router-dom';
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
    callback('Hãy nhập mật khẩu!');
  } else if (value.length < 6) {
    callback('Nhập mật khẩu đủ 6 ký tự!');
  } else if (!/[a-z]/.test(value)) {
    callback('Nhập mật khẩu gồm ký tự viết thường!');
  } else if (!/[A-Z]/.test(value)) {
    callback('Nhập mật khẩu gồm ký tự viết hoa!');
  } else if (!/[!@#$%^&*]/.test(value)) {
    callback('Nhập mật khẩu gồm ký tự đặc biệt!');
  } else {
    callback();
  }
};

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
     
      console.log('Form submitted:', values);

      
      const response = await fetch(
        'https://edison-garage-api.savvycom.xyz/api/auth/local',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      console.log('API response:', data);

      if (response.ok) {
        
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
      <Input/>
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