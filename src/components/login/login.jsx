import { Button, Checkbox,Form, Input } from 'antd';
import React from 'react'
import {DivStyle, FormItem, FormStyle, HeadingLogin,Label,MainLogin, InforLogin,FormItemBtn, StyleBtn} from './login'
const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const validateEmail = (rule, value) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (value && !emailPattern.test(value)) {
      return Promise.reject('Hãy nhập email!');
    }
    return Promise.resolve();
  };
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
    onFinish={onFinish}
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
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
        {
            validator: validateEmail, 
        },
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
      <StyleBtn type="" htmlType="Login">
        <span>Log in</span>
      </StyleBtn>
    </FormItem>
    </MainLogin>
  </FormStyle>
    </DivStyle>
  )
}
