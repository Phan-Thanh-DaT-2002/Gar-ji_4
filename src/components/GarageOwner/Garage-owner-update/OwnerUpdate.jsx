import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
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
  import {
    StyledDOB,
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
  } from './index.js';
  import { AudioOutlined, DeleteOutlined } from '@ant-design/icons';
export default function OwnerUpdate() {
    
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({
      fullname: '',
      email: '',
      username: '',
      password: '',
      phone: '',
      gender: '',
      dob: null,
      role: '',
      status: '',
    });
  


    const [userId, setUserId] = useState(null);

    const fetchData = async (userId) => {
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
          `http://localhost:1337/api/users/${userId}`,
          requestOptions
        );
        const data = await response.json();
    
        if (response.ok) {
          console.log(data);
          form.setFieldsValue({
            name: data?.fullname || '',
            email: data?.email || '',
            username: data?.username || '',
            password: '***',
            phone: data?.phoneNumber || '',
            gender: data?.gender || '',
            dob: data?.dob ? moment(data.dob, 'YYYY-MM-DD') : null,
            role: '***',
            status: data?.blocked ? 'inactive' : 'active',
          });
        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const fetchUserList = async () => {
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
          'http://localhost:1337/api/users',
          requestOptions
        );
        const userList = await response.json();
    
        if (response.ok) {
          userList.forEach((user) => {
            const userId = user.id;
            console.log('User ID:', userId);
            setUserId(userId); // Cập nhật giá trị userId trong state
            fetchData(userId);
          });
        } else {
          console.error('Error:', userList);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    useEffect(() => {
      fetchUserList();
    }, []);
    
    const onFinish = async (values) => {
      try {
        const jwt = localStorage.getItem('jwt');
        const updatedUserId = userId; // Sử dụng giá trị userId hiện tại
    
        const raw = JSON.stringify({
          fullname: values.name,
          dob: values.dob.format('YYYY-MM-DD'),
          address: values.address,
          phoneNumber: values.phone,
          
          confirmed: true,
          blocked: false,
        });
    
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: raw,
          redirect: 'follow',
        };
    
        const response = await fetch(
          `http://localhost:1337/api/users/${updatedUserId}`, // Sử dụng updatedUserId thay cho userId
          requestOptions
        );
        const data = await response.json();
    
        if (response.ok) {
          console.log('Response:', data);
          message.success('Form submitted successfully!');
        } else {
          console.error('Error:', data);
          message.error('Failed to submit form!');
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('An error occurred');
      }
    };
  
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
    const { Option } = Select;
    
    const onCancel = () => {
      form.resetFields();
      window.history.back();
    };
    
    const onChange = (e) => {
      console.log(`checked = ${e.target.checked}`);
    };
    
  
    const [garagesData, setGaragesData] = useState([]);
    
   
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedGarages, setSelectedGarages] = useState([]);
    
      const [displayCount, setDisplayCount] = useState(5);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDisplayCount(5);
  };

  const handleGarageChange = (garage) => {
    const index = selectedGarages.findIndex((g) => g.id === garage.id);
    if (index === -1) {
      setSelectedGarages([...selectedGarages, garage]);
    } else {
      setSelectedGarages(selectedGarages.filter((g) => g.id !== garage.id));
    }
  };

  const handleRemoveGarage = (garage) => {
    setSelectedGarages(selectedGarages.filter((g) => g.id !== garage.id));
  };
      
      useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
          redirect: 'follow'
        };
      
        fetch("http://localhost:1337/api/garage-services", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            setGaragesData(result.data);
          })
          .catch(error => console.log('error', error));
      }, []);
      
     
      
      const getGarageNameById = (garageId) => {
        const selectedGarage = garagesData.find((garage) => garage.id === garageId);
        return selectedGarage ? selectedGarage.attributes.name : '';
      };
    
      const filteredGarages = garagesData
        ? garagesData
            .filter((garage) => {
              const garageName = garage.attributes.name.toLowerCase();
              const searchTermLower = searchTerm.toLowerCase();
              return (
                garage.id.toString().includes(searchTermLower) ||
                garageName.includes(searchTermLower)
              );
            })
            .slice(0, displayCount)
        : [];
    
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
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          
          autoComplete="off"
          
        >
          <FirstInfo>
            <FirstLine>
              <FormItem
                label="Name"
                labelCol={{ span: 24 }}
                name="name"
                  initialValue={userData?.fullname}
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
                name="email"
                initialValue={userData?.email}
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
                <Input placeholder="Enter owner email" />
              </FormItem>
  
              <FormItem
                label="Username"
                name="username"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input placeholder="Enter owner username" />
              </FormItem>
            </FirstLine>
  
            <FirstLine>
              <FormItem
                label="Password"
                labelCol={{ span: 24 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input placeholder="Enter owner password" />
              </FormItem>
              <FormItem
                label="Phone number"
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
                <Input placeholder="Enter owner phone number" />
              </FormItem>
              <FormItem
                name="gender"
                label="Gender"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select gender!',
                  },
                ]}
              >
                <StyleSelect
                  className="style_select"
                  placeholder="Select owner gender"
                  allowClear={false}
                >
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  
                </StyleSelect>
              </FormItem>
            </FirstLine>
            <SecondLine>
              <FormItem label="DOB" labelCol={{ span: 24 }} name="dob">
                <StyledDOB />
              </FormItem>
              <FormItem
              name='role'
                label="Role"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a role!',
                  },
                ]}
              >
                <StyleSelect
                  className="selectStyle"
                  placeholder="Select a role"
                  name='role'
                  allowClear={false}
                >
                  <Option value="1">Admin</Option>
                  <Option value="2">User</Option>
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
                  <Form></Form>
                  <ThreeLine>
    <div className="title_formS">Garages</div>
    <FormSearch>
      <LeftColumn>
        <StyleInput
          placeholder="Search for garages..."
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SCheckbox>
          {filteredGarages.map((garage) => (
            <div key={garage.id}>
              <StyleCheckBox
                checked={selectedGarages.some((g) => g.id === garage.id)}
                onChange={() => handleGarageChange(garage)}
              >
                {garage.attributes.name} 
              </StyleCheckBox>
            </div>
          ))}
        </SCheckbox>
      </LeftColumn>
      <MyDivider type="vertical" />
      <RightColumn>
        <div className="select_gara">Select garages ({selectedGarages.length})</div>
        {selectedGarages.map((garage) => (
          <div className="select_remove" key={garage.id}>
            <span>{getGarageNameById(garage.id)}</span>
            <DeleteOutlined
              style={{ fontSize: '24px' }}
              onClick={() => handleRemoveGarage(garage)}
            />
          </div>
        ))}
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
                    <span>Update</span>
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
