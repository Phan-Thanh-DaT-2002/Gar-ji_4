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
  Modal,
} from 'antd';

import moment from 'moment';
export default function OwnerView() {
  const [userData, setUserData] = useState([]);

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
          'http://localhost:1337/api/users/me?populate=role,avatar',
          requestOptions
        );
        const result = await response.json();

        if (response.ok) {
          console.log(result);
          setData(result.role);
          console.log(result.role.type);

          console.error('Error:', result);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handok = () => {
    navigate('/garage-owner');
  };
  const handleUpdate = userId => {
    if (isAdmin) {
      navigate('/owner-update', { state: { userId: userId } });
    } else {
      message.error('You do not have permission to update.');
    }
  };
  const { Option } = Select;

  const [form] = Form.useForm();
  const [temp_data_user, setTemp_data_user] = useState(0);
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
          `http://localhost:1337/api/users/${userId}?populate=garages,role`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          // setData(result);
          // console.log(data);
          setGaragesData(result.garages);
          setTotalGarages(result.garages.length);
          setTemp_data_user(result.id);
          form.setFieldsValue({
            name: result.fullname,
            email: result.email,
            username: result.username,
            phone: result.phoneNumber,
            gender: result.gender,
            dob: result?.dob ? moment(result.dob, 'YYYY-MM-DD') : null,
            role: result.role.name,
            garages: result.garages.map(garage => garage.id),
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
    navigate(-1);
  };

  console.log(temp_data_user);
  const onDelete = record => {
    console.log(record);

    Modal.confirm({
      title: 'Are you sure about that?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        if (isAdmin) {
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
        } else {
          message.error('You do not have permission to delete.');
        }
      },
    });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarages, setSelectedGarages] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setDisplayCount(5);
  };
  const handleRemoveGarage = garage => {
    setSelectedGarages(selectedGarages.filter(g => g.id !== garage.id));
  };
  const getGarageNameById = garageId => {
    const selectedGarage = garagesData.find(garage => garage.id === garageId);
    return selectedGarage ? selectedGarage.attributes.name : '';
  };
  const isAdmin = data && data.type === 'admin';
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
                  <span
                    style={{
                      marginLeft: '15px',
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
                style={{}}
                labelCol={{ span: 24 }}
                name="name"
              >
                <Input
                  placeholder="Enter owner name"
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>
              <FormItem
                label={
                  <span
                    style={{
                      marginLeft: '15px',
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
              >
                <Input
                  placeholder="Enter owner email"
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>

              <FormItem
                label={
                  <span
                    style={{
                      marginLeft: '15px',
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
              >
                <Input
                  placeholder="Enter owner username"
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>
            </FirstLine>

            <FirstLine>
              <FormItem
                label={
                  <span
                    style={{
                      marginLeft: '15px',
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
                <StyledDOB
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  disabledDate={() => true}
                  inputReadOnly
                  suffixIcon={null}
                />
              </FormItem>
              <FormItem
                label={
                  <span
                    style={{
                      marginLeft: '15px',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#939393',
                    }}
                  >
                    Phone Number
                  </span>
                }
                labelCol={{ span: 24 }}
                name="phone"
              >
                <Input
                  placeholder="Enter owner phone number"
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>
              <FormItem
                name="gender"
                label={
                  <span
                    style={{
                      marginLeft: '15px',
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
              >
                <Input
                  className="selectStyle"
                  placeholder=""
                  type="text"
                  readOnly
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  value={
                    data
                      ? data.gender === 'Female'
                        ? 'Female'
                        : 'Male'
                      : undefined
                  }
                />
              </FormItem>
            </FirstLine>
            <SecondLine>
              <FormItem
                label={
                  <span
                    style={{
                      marginLeft: '15px',
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
                name="role"
              >
                <Input
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>
            </SecondLine>
            <ThreeLine>
              <div className="title_formS">Garages</div>
              <FormSearch>
                <RightColumn>
                  {garagesData.map(garage => (
                    <div className="content_formS" key={garage.id}>
                      {garage.name}
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
                  onClick={() => handleUpdate(userId)}
                >
                  <span>Edit</span>
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
