import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  StyledDOB,
  AllDiv,
  DivForm,
  DivStyle,
  FirstInfo,
  FirstLine,
  FormItem,
  StyledOption,
  StyleSelect,
  SecondLine,
  FormSearch,
  ThreeLine,
  StyleSearch,
  StyleInput,
  SCheckbox,
  StyleCheckBox,
  LeftColumn,
  RightColumn,
  MyDivider,
  Btn,
  ButtonStyle,
} from './index.js';
import {
  DatePicker,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TreeSelect,
  AutoComplete,
  Divider,
  message,
} from 'antd';

import moment from 'moment';
export default function OwnerView() {
    const { Option } = Select;
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [totalGarages, setTotalGarages] = useState(0);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};
  const [data, setData] = useState(null);
 
  const [garagesData, setGaragesData] = useState([]);


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
          `http://localhost:1337/api/users/${userId}?populate=garages`,
          requestOptions
        );
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setData(result);
          setGaragesData(result.garages)
          setTotalGarages(result.garages.length);
          form.setFieldsValue({
            name: result.fullname,
            email: result.email,
            username: result.username,
          
            phone: result.phoneNumber,
            gender: result.gender,
            dob: result?.dob ? moment(result.dob, 'YYYY-MM-DD') : null,
            role: result.role,
            garages: result.garages.map((garage) => garage.id),
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
  const handleCancel = () => {
    navigate(-1); // Quay lại phía trước
  };
   
      
     
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedGarages, setSelectedGarages] = useState([]);
      
        const [displayCount, setDisplayCount] = useState(5);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      setDisplayCount(5);
    };
  
    
  
    const handleRemoveGarage = (garage) => {
      setSelectedGarages(selectedGarages.filter((g) => g.id !== garage.id));
    };
      
       
        
        const getGarageNameById = (garageId) => {
          const selectedGarage = garagesData.find((garage) => garage.id === garageId);
          return selectedGarage ? selectedGarage.attributes.name : '';
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
                style={{}}
                labelCol={{ span: 24 }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input placeholder="Enter owner name" style={{ border: "none", cursor:"default" }} readOnly />
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
                Email
              </span>
            }
                labelCol={{ span: 24 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input  placeholder="Enter owner email"  style={{ border: "none", cursor:"default" }} readOnly/>
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
                Username
              </span>
            }
                name="username"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input placeholder="Enter owner username" style={{ border: "none", cursor:"default" }} readOnly />
              </FormItem>
            </FirstLine>
  
            <FirstLine>
            <FormItem label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                DOB
              </span>
            } labelCol={{ span: 24 }} name="dob">
                <StyledDOB  style={{ border: "none", cursor:"default" }} inputReadOnly suffixIcon={null} />
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
                Phone Number
              </span>
            }
                labelCol={{ span: 24 }}
                name="phone"
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
                <Input placeholder="Enter owner phone number" style={{ border: "none", cursor:"default" }} readOnly/>
              </FormItem>
              <FormItem
                name="gender"
                label={
              <span style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#939393',
              }}>
                Gender
              </span>
            }
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select gender!',
                  },
                ]}
              >
                
                
                  <Input
                  className="selectStyle"
                  placeholder=""
                  type="text" 
                  readOnly 
                  style={{ border: "none", cursor:"default" }}
                  value={data ? (data.gender === "Female" ? "female" : "male") : undefined} 
                />
                 
                
              </FormItem>
            </FirstLine>
            <SecondLine>
            
            </SecondLine>
                  <Form></Form>
                  <ThreeLine>
      <div className="title_formS">Garages</div>
      <FormSearch>
       
        <RightColumn>
        
  {garagesData.map((garage) => (
  <div className='content_formS' key={garage.id}>{garage.name}</div>
))}
  
</RightColumn>
      </FormSearch>
    </ThreeLine>
              <div className="Btns">
                <Divider style={{ border: '1px solid #DDE4EE', margin: 0 }} />
                <div className="btn-button">
                  <ButtonStyle htmlType="button"onClick={handleCancel} >
                    <span>Back</span>
                  </ButtonStyle>
                </div>
              </div>
            </FirstInfo>
          </DivForm>
        </AllDiv>
      </DivStyle>
    );
  }
