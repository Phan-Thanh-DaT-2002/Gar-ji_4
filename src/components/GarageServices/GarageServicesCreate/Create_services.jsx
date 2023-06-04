import React, { useState } from 'react';

import {
  
 
  AllDiv,
  DivForm,
  DivStyle,
 
  FirstLine,
  FormItem,
  ButtonStyle,
  StyleCommentBox,
  StyledTextArea,
  FirstInfo,
  
} from './index.js';
import {

  Form,
  Input,
  Select,
 
  Divider,
  message,
  
} from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function CreateServices() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const jwt = localStorage.getItem('jwt')
      const minPrice = parseInt(values.minPrice);
      const maxPrice = parseInt(values.maxPrice);
      if (minPrice >= maxPrice) {
        message.error('Min price must be lower than max price');
        return;
      }
      const raw = JSON.stringify({
        "data": {
          name: values.name,
          description: values.description,
          minPrice: minPrice,
          maxPrice: maxPrice
        }
      });
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: raw,
        redirect: 'follow',
      };
  
      const response = await fetch('http://localhost:1337/api/garage-services', requestOptions);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Response:', data);
        message.success('Form submitted successfully!');
        setTimeout(() => {
          navigate('/garage-services');
        }, 1500); 
       
      } else {
        console.error('Error:', data);
        message.error('Failed to submit form!');
      
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
     
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;
  const onCancel = () => {
    form.resetFields();
    window.history.back();
  };
  
  return (
    <DivStyle>
      <AllDiv>
      <h1
              style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '24px',
                color: '#111111',
              }}
            >
              <span style={{opacity:'0.5'}}>All Garages </span>  &gt; <span> Add a new services </span>
            </h1>
        <DivForm
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{}}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <FirstInfo>
            <FirstLine>
              <FormItem
                label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Name
              </span>
            }
                labelCol={{ span: 24 }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your services name!',
                  },
                ]}
              >
                <Input placeholder="Enter services name" />
              </FormItem>
              <FormItem
               label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Min price
              </span>
            }
                labelCol={{ span: 24 }}
                name="minPrice"
                rules={[
                  {
                    required: true,
                    message: 'Please input min price!',
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please input a valid price!',
                  },
                  
                ]}
              >
                <Input placeholder="Enter min price" />
              </FormItem>

              <FormItem
               label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Max price
              </span>
            }
                labelCol={{ span: 24 }}
                name="maxPrice"
                rules={[
                  {
                    required: true,
                    message: 'Please input max price',
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please input a valid price!',
                  },
                ]}
              >
                <Input placeholder="Enter max price" />
              </FormItem>
            </FirstLine>
            <StyleCommentBox>
            <FormItem
                label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Description
              </span>
            }
                labelCol={{ span: 24 }}
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input description',
                  },
                 
                ]}
                
              >
                <StyledTextArea 
                autoSize={{ minRows: 4, maxRows: 30 }}
                placeholder="Enter a description" 
                style={{
                  
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#111111',
                }}
                />
              </FormItem>
            </StyleCommentBox>

            
            <div className="Btns">
              <Divider style={{ border: '1px solid #DDE4EE', margin: 0 }} />
              <div className="btn-button">
                <ButtonStyle
                  type="primary"
                  style={{ background: '#8767E1' }}
                  htmlType="submit"
                >
                  <span>Save</span>
                </ButtonStyle>
                <ButtonStyle htmlType="button" onClick={onCancel}>
                  <span>Cancel</span>
                </ButtonStyle>
              </div>
            </div>
          </FirstInfo>
        </DivForm>
      </AllDiv>
    </DivStyle>
  );
}


