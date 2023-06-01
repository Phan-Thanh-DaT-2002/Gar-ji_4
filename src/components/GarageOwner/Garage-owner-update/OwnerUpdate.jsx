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
  Modal,
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
import { useLocation, useNavigate } from 'react-router-dom';
export default function OwnerUpdate() {

  const handok = () => {
    navigate('/garage-owner');
  }
  const { Option } = Select;
  const [temp_data_user, setTemp_data_user] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [totalGarages, setTotalGarages] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [data, setData] = useState(null);
  const [garages, setGarages] = useState([])


  const [selectedGarages, setSelectedGarages] = useState([]);
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
          `http://localhost:1337/api/users/${userId}?populate=role, garages`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();

          setData(result);
          setSelectedGarages(result.garages)
          setTotalGarages(result.garages.length);
          setTemp_data_user(result.id)
          form.setFieldsValue({
            name: result.fullname,
            email: result.email,
            username: result.username,
            password: '******',
            phone: result.phoneNumber,
            gender: result.gender,
            dob: result?.dob ? moment(result.dob, 'YYYY-MM-DD') : null,
            role: result.role.id,
            status: result?.blocked ? 'Inactive' : 'Active',
            // garages: result.garages?.name,

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


  const onFinish = async (values) => {
    try {
      const jwt = localStorage.getItem('jwt');
      const updatedUserId = userId;

      const raw = JSON.stringify({
        fullname: values.name,
        dob: values.dob.format('YYYY-MM-DD'),
        address: values.address,
        phoneNumber: values.phone,
        role: values.role,
        garages: selectedGarages.map((garage) => garage.id),
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

  const [userData, setUserData] = useState([]);
  console.log(temp_data_user);
  const onDelete = record => {
    console.log(record);

    Modal.confirm({
      title: 'Are you sure about that?',
      onOk: () => {
        setUserData(prevData => {
          return prevData.filter(data => data.id !== record);
        });

        const jwt = localStorage.getItem('jwt');
        console.log(jwt);
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };
        fetch(`http://localhost:1337/api/users/${record}`, requestOptions)
          .then(response => {
            response.json();
            message.success('delete sussesful');
            handok();
          })
          .then(result => {
            if (!result.success) {
              console.log('Error deleting user');
              console.log('Error deleting user');
            }
          })
          .catch(error => console.log('Error deleting user', error));

      },
    });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };


  const [garagesData, setGaragesData] = useState([]);


  const [searchTerm, setSearchTerm] = useState('');


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

    fetch("http://localhost:1337/api/garages", requestOptions)
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
                    message: 'Please input your name!',
                  },
                ]}

              >
                <Input placeholder="Enter owner name" />
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
                <Input placeholder="Enter owner email" />
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
                <Input placeholder="Enter owner username" />
              </FormItem>
            </FirstLine>

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
                    Password
                  </span>
                }
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
                <Input placeholder="Enter owner phone number" />
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
                <StyleSelect
                  className="style_select"
                  placeholder="Select owner gender"
                  allowClear={false}
                  style={{}}
                >
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>

                </StyleSelect>
              </FormItem>
            </FirstLine>
            <SecondLine>
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
                <StyledDOB />
              </FormItem>
              <FormItem
                name='role'
                label={
                  <span style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
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
                  name='role'
                  allowClear={false}
                >
                  <Option value={3}>Admin</Option>
                  <Option value={1}>User</Option>
                </StyleSelect>
              </FormItem>
              <FormItem
                name="status"
                label={
                  <span style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
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
                <ButtonStyle
                  htmlType="button"
                  onClick={() => onDelete(temp_data_user)}
                >
                  <span>Delete</span>
                </ButtonStyle>
              </div>
            </div>
          </FirstInfo>
        </DivForm>
      </AllDiv>
    </DivStyle>
  );

}
