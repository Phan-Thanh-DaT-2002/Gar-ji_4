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


function CreateManager() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const jwt = localStorage.getItem('jwt')
      const raw = JSON.stringify({
        name: values.name,
        description: values.description,
        minPrice: 100000,
        maxPrice: 200000
      })
    } catch (error) {
      
    }
    setLoading(true);
    setTimeout(() => {
      message.success('Form submitted successfully!');
      setLoading(false);
      form.resetFields();
      console.log(values);
    }, 2000);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;
  const onCancel = () => {
    form.resetFields();
  };

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onSearch = value => console.log(value);
  return (
    <DivStyle>
      <AllDiv>
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
                label="Name"
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
                label="Min price"
                labelCol={{ span: 24 }}
                name="min_price"
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
                label="Max price"
                labelCol={{ span: 24 }}
                name="max_price"
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
                label="Description"
                labelCol={{ span: 24 }}
                name="desc"
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

export default CreateManager;
