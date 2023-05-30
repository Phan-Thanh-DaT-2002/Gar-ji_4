import React, { useEffect, useState } from 'react';
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
} from './create.js';
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

function Create() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      const jwt = localStorage.getItem('jwt');

      const raw = JSON.stringify({
        username: values.username,
        fullname: values.name,
        email: values.email,
        dob: values.dob.format('YYYY-MM-DD'),
        address: values.address,
        phoneNumber: values.phone,
        gender: values.gender,
        password: values.password,
        role: parseInt(values.role),
        confirmed: true,
        blocked: values.status === 'inactive' ? true : false,
        garages: selectedGarages.map(garage => garage.id),
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'http://localhost:1337/api/users',
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

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;

  const onCancel = () => {
    form.resetFields();
    window.history.back();
  };

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
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

  const [garagesData, setGaragesData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarages, setSelectedGarages] = useState([]);

  const [displayCount, setDisplayCount] = useState(5);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setDisplayCount(5);
  };

  const handleGarageChange = garage => {
    const index = selectedGarages.findIndex(g => g.id === garage.id);
    if (index === -1) {
      setSelectedGarages([...selectedGarages, garage]);
    } else {
      setSelectedGarages(selectedGarages.filter(g => g.id !== garage.id));
    }
  };

  const handleRemoveGarage = garage => {
    setSelectedGarages(selectedGarages.filter(g => g.id !== garage.id));
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      redirect: 'follow',
    };

    fetch('http://localhost:1337/api/garages', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setGaragesData(result.data);
      })
      .catch(error => console.log('error', error));
  }, []);

  const getGarageNameById = garageId => {
    const selectedGarage = garagesData.find(garage => garage.id === garageId);
    return selectedGarage ? selectedGarage.attributes.name : '';
  };

  const filteredGarages = garagesData
    ? garagesData
        .filter(garage => {
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
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Name
                  </span>
                }
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
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
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
                <Input placeholder="Enter owner email" />
              </FormItem>

              <FormItem
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
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
                <Input placeholder="Enter owner username" />
              </FormItem>
            </FirstLine>

            <FirstLine>
              <FormItem
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Password
                  </span>
                }
                labelCol={{ span: 24 }}
                name="password"
                rules={[
                  {
                    required: true,
                    validator: validatePassword,
                  },
                ]}
              >
                <Input placeholder="Enter owner password" />
              </FormItem>
              <FormItem
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Phone number
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
                <Input placeholder="Enter owner phone number" />
              </FormItem>
              <FormItem
                name="gender"
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
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
              <FormItem
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    DOB
                  </span>
                }
                labelCol={{ span: 24 }}
                name="dob"
              >
                <StyledDOB />
              </FormItem>
              <FormItem
                name="role"
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Role
                  </span>
                }
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
                  name="role"
                  allowClear={false}
                >
                  <Option value="3">Admin</Option>
                  <Option value="1">User</Option>
                </StyleSelect>
              </FormItem>
              <FormItem
                name="status"
                label={
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Status
                  </span>
                }
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
                    {filteredGarages.map(garage => (
                      <div key={garage.id}>
                        <StyleCheckBox
                          checked={selectedGarages.some(
                            g => g.id === garage.id
                          )}
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
                  <div className="select_gara">
                    Select garages ({selectedGarages.length})
                  </div>
                  {selectedGarages.map(garage => (
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

export default Create;
