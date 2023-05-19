import React, { useState } from 'react';
import { AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  

  AllDiv,
  DivForm,
  DivStyle,
  FirstInfo,
  FirstLine,
  FormItem,

  StyleSelect,
  SecondLine,
  FormSearch,
  ThreeLine,
  
  StyleInput,
  SCheckbox,
  StyleCheckBox,
  LeftColumn,
  RightColumn,
  MyDivider,

  ButtonStyle,
 
  StyledTimePicker,
  StyleCommentBox,
  StyledTextArea,
  
} from './index.js';
import {
  Form,
  Input,
  Select,
  Divider,
  message,
} from 'antd';
import moment from 'moment';

function CreateManager() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const response = await fetch("https://edison-garage-api.savvycom.xyz/api/garages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY4MjM5MjQ4NywiZXhwIjoxNjg0OTg0NDg3fQ.ScXFJ7wfQnHase1eCAidF9Fs0i1PT-LrON9owXDUvUc"),
        },
        body: JSON.stringify({
          data: {
            name: values.name,
            address: values.address,
            status: values.status,
            phoneNumber: values.phoneNumber,
            email: values.email,
            openTime: values.openTime,
            closeTime: values.closeTime,
            description: values.description,
            policy: values.policy,
            owner: values.owner,
            services: [],
          },
        }),
      });
      const data = await response.json();
      console.log(data);
      message.success("Form submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.log("Error:", error);
    }
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
          id='my_Form'
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
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input placeholder="Enter owner name" />
              </FormItem>
              <FormItem
                label="Email"
                labelCol={{ span: 24 }}
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input placeholder="Enter owner email" />
              </FormItem>

              <FormItem
                label="Phone number"
                labelCol={{ span: 24 }}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                  {
                    pattern: /^[0-9]{10,}$/,
                    message: 'Please input a valid phone number!',
                  },
                ]}
              >
                <Input placeholder="Enter owner phone number" />
              </FormItem>
            </FirstLine>

            <FirstLine>
              <FormItem
                label="Address"
                labelCol={{ span: 24 }}
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input garage address!',
                  },
                 
                ]}
              >
                <Input placeholder="Enter garage address" />
              </FormItem>
              <FormItem
                  name="openTime"
                  label="Open time"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,   
                      message: 'Please select time!',
                    },
                  ]}
                >
                  <StyledTimePicker 
                    picker="time"
                    dropdownClassName="my-dropdown-class"
                    className="ant-select.ant-select-in-form-item"
                    placeholder="Select open time"
                    format="HH:mm"
                    defaultValue={""}
                    
                  />
                </FormItem>
                <FormItem
                  name="closeTime"
                  label="Close time"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please select time!',
                    },
                  ]}
                >
                  <StyledTimePicker
                    dropdownClassName="my-dropdown-class"
                    className="ant-select.ant-select-in-form-item"
                    placeholder="Select close time"
                    format="HH:mm"
                    defaultValue={moment('00:00', 'HH:mm')}
                  />
                </FormItem>
            </FirstLine>
            <SecondLine>
              <FormItem
                name="owner"
                label="Select a garage owner"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a garage owner!',
                  },
                ]}
              >
                <StyleSelect
                  
                  placeholder="Select a garage owner"
                  allowClear={false}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </StyleSelect>
              </FormItem>
              <FormItem
                name="status"
                label="Status"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a status!',
                  },
                ]}
              >
                <StyleSelect placeholder="Select a status" allowClear={false}>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
          
                </StyleSelect>
              </FormItem>
            </SecondLine>
            <StyleCommentBox>
            <FormItem
                label="Description"
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
                
                />
              </FormItem>
              <FormItem
                label="Policy"
                labelCol={{ span: 24 }}
                name="policy"
                rules={[
                  {
                    required: true,
                    message: 'Please input policy',
                  },
                 
                ]}
              >
                <StyledTextArea 
                autoSize={{ minRows: 4, maxRows: 30 }}
                placeholder="Enter a policy" 
                
                />
              </FormItem>
            </StyleCommentBox>

            <ThreeLine>
              <div className="title_formS">Garages</div>
              <FormSearch>
                <LeftColumn>
                  <StyleInput placeholder="Search for garages..." />
                  <SCheckbox>
                    <StyleCheckBox onChange={onChange}>
                      Garage ABC
                    </StyleCheckBox>
                    <StyleCheckBox onChange={onChange}>TLS</StyleCheckBox>
                    <StyleCheckBox onChange={onChange}>AHC</StyleCheckBox>
                    <StyleCheckBox onChange={onChange}>CB Garage</StyleCheckBox>
                    <StyleCheckBox onChange={onChange}>UCQ</StyleCheckBox>
                  </SCheckbox>
                </LeftColumn>
                <MyDivider type="vertical" />
                <RightColumn>
                  <div className="select_gara">Services garages (2)</div>
                  <div className="select_remove">
                    <span>Garage ABC</span>
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                  </div>
                  <div className="select_remove">
                    <span>TLS</span>
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                  </div>
                </RightColumn>
              </FormSearch>
            </ThreeLine>
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
