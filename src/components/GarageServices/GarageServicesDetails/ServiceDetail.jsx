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
import { Form, Input, Select, Divider, message, Modal } from 'antd';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ServiceDetail() {
  const [userData, setUserData] = useState([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;

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
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handok = () => {
    navigate('/garage-services');
  };

  const handleEdit = userId => {
    navigate('/services-update', { state: { userId: userId } });
  };

  const location = useLocation();
  const { userId } = location.state || {};
  const [data, setData] = useState(null);
  const [temp_data_service, settemp_data_service] = useState(0);
  const [totalGarages, setTotalGarages] = useState(0);
  const [garagesData, setGaragesData] = useState([]);
  //hien thi thong tin ra man hinh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers: {
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
          settemp_data_service(result);
          form.setFieldsValue({
            name: result.data.attributes.name,
            description: result.data.attributes.description,
            minPrice: result.data.attributes.minPrice,
            maxPrice: result.data.attributes.maxPrice,
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jwt = localStorage.getItem('jwt');
  //       const requestOptions = {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //         redirect: 'follow',
  //       };

  //       const response = await fetch(
  //         `http://localhost:1337/api/garage-services/${filters}`,
  //         requestOptions
  //       );

  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log(result);
  //         // setData(result);
  //         // console.log(data);
  //         setGaragesData(result.garages);
  //         setTotalGarages(result.garages.length);
  //         temp_data_service(result.id);
  //         form.setFieldsValue({
  //           name: result.fullname,
  //           email: result.email,
  //           username: result.username,
  //           phone: result.phoneNumber,
  //           gender: result.gender,
  //           dob: result?.dob ? moment(result.dob, 'YYYY-MM-DD') : null,
  //           role: result.role.name,
  //           garages: result.garages.map(garage => garage.id),
  //         });
  //       } else {
  //         console.error('Error:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

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
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };
        fetch(
          `http://localhost:1337/api/garage-services/${record}`,
          requestOptions
        )
          .then(response => {
            response.json();
            message.success('delete sussesful');
            handok();
          })
          .then(result => {
            if (!result.success) {
              console.log('Error deleting');
            }
          })
          .catch(error => console.log('Error deleting user', error));
      },
    });
  };
  const [serviceValues, setServiceValues] = useState([]);

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
                labelCol={{ span: 24 }}
                name="name"
              >
                <Input
                  placeholder="Enter services name"
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
                    Min price
                  </span>
                }
                labelCol={{ span: 24 }}
                name="minPrice"
              >
                <Input
                  placeholder="Enter min price"
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
                    Max price
                  </span>
                }
                labelCol={{ span: 24 }}
                name="maxPrice"
              >
                <Input
                  placeholder="Enter max price"
                  style={{
                    border: 'none',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                  readOnly
                />
              </FormItem>
            </FirstLine>
            <StyleCommentBox>
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
                    Description
                  </span>
                }
                labelCol={{ span: 24 }}
                name="description"
              >
                <StyledTextArea
                  autoSize={{ minRows: 4, maxRows: 30 }}
                  style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    border: 'none',
                    cursor: 'default',
                    color: '#111111',
                    pointerEvents: 'none',
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
                  onClick={() => handleEdit(userId)}
                >
                  <span>Edit</span>
                </ButtonStyle>
                <ButtonStyle
                  htmlType="button"
                  onClick={() => onDelete(temp_data_service.data.id)}
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
