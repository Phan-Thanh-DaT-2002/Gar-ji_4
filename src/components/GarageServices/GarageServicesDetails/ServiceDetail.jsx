import React, { useEffect, useState } from 'react';

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
import { useLocation, useNavigate } from 'react-router-dom';


export default function ServiceDetail() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
  const handleView = (userId) => {
    navigate('/services-update', { state: { userId: userId } });
  };
  const location = useLocation();
  const { userId } = location.state || {};
const [data, setData] = useState(null);


const [owner, setOwner] = useState(null);

const [serviceValues, setServiceValues] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        redirect: 'follow',
      };

      const response = await fetch(
        `http://localhost:1337/api/garage-services/${userId}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setData(result);
        form.setFieldsValue({
          name: result.data.attributes.name,
          description:result.data.attributes.description,
          minPrice:result.data.attributes.minPrice,
          maxPrice:result.data.attributes.maxPrice,
        

          
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, [userId]);
  const onCancel = () => {
    form.resetFields();
  };

  
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
          
          autoComplete="off"
          form={form}
        >
          <FirstInfo>
            <FirstLine>
              <FormItem
                label={
              <span style={{
                marginLeft:'15px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Name
              </span>}
                labelCol={{ span: 24 }}
                name="name"
              >
                <Input placeholder="Enter services name" style={{ border: "none", cursor:"default" }} readOnly/>
              </FormItem>
              <FormItem
              
              label={
              <span style={{
                marginLeft:'15px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Min price
              </span>}
                labelCol={{ span: 24 }}
                name="minPrice"
               
              >
                <Input placeholder="Enter min price" style={{ border: "none", cursor:"default" }} readOnly />
              </FormItem>

              <FormItem
                label={
              <span style={{
                marginLeft:'15px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Max price
              </span>}
                labelCol={{ span: 24 }}
                name="maxPrice"
              >
                <Input placeholder="Enter max price" style={{ border: "none", cursor:"default" }} readOnly/>
              </FormItem>
            </FirstLine>
            <StyleCommentBox>
            <FormItem
                label={
              <span style={{
                marginLeft:'15px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Description
              </span>}
                labelCol={{ span: 24 }}
                name="description"
              >
                <StyledTextArea 
                autoSize={{ minRows: 4, maxRows: 30 } }
                style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    border: "none", 
                    cursor:"default",
                    color: '#111111',
                    
                }}  
                readOnly
                />
              </FormItem>
            </StyleCommentBox>

            
            <div className="Btns">
              <Divider style={{ border: '1px solid #DDE4EE', margin: 0 }} />
              <div className="btn-button">
                <ButtonStyle
                  type="primary"
                  style={{ background: '#8767E1' }}
                  onClick={() => handleView(userId)}
                >
                  <span>Edit</span>
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

