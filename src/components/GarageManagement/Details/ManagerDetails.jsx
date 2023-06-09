import React, { useEffect, useState } from 'react';
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
import { Form, Input, Select, Divider, message, Modal } from 'antd';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ManagerDetails() {
  const [form] = Form.useForm();
  const [garageOwners, setGarageOwners] = useState([]);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const handleUpdate = (userId) => {
    navigate('/manager-update', { state: { userId: userId } });
  };
  const onok = () => {
    navigate('/garage');

  }
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
          `http://localhost:1337/api/garages/${userId}?populate=owner, services`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setData(result);
          setServiceValues(result.data.attributes.services.data || []);
          setFullName(result?.data?.attributes?.name || '');
          console.log(owner);
          form.setFieldsValue({
            name: result.data.attributes.name,
            address: result.data.attributes.address,
            status: result.data.attributes.status,
            phoneNumber: result.data.attributes.phoneNumber,
            email: result.data.attributes.email,
            description: result.data.attributes.description,
            policy: result.data.attributes.policy,
            owner: result?.data?.attributes?.owner?.data?.attributes?.fullname,
            openTime: moment(result.data.attributes.openTime, 'HH:mm'),
            closeTime: moment(result.data.attributes.closeTime, 'HH:mm'),
            // services: result.data.attributes.services.map((services)=>services),
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


  const [canDeleteFlag, setCanDeleteFlag] = useState(false);
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



  const getServiceNameById = (serviceId) => {
    const selectedService = garagesData.find((service) => service.id === serviceId);
    return selectedService ? selectedService.attributes.name : '';
  };

  const [userData, setUserData] = useState([])
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

    fetch("http://localhost:1337/api/users", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setUserData(result);
      })
      .catch(error => console.log('error', error));
  }, []);

  const handleDelete = record => {
    console.log(record);
    Modal.confirm({
      title: 'Are you sure about that?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        setUserData(prevData => {
          return prevData.filter(data => data.id !== record.id);
        });

        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };
        console.log(jwt);
        fetch(`http://localhost:1337/api/garages/${record}`, requestOptions)
          .then(response => {
            response.json();
            message.success("delete complete");
            onok();
          })
          .then(result => {
            if (!result.success) {
              console.log('Error ss ');
            }
          })
          .catch(error => console.log('Error deleting ', error));

      },
    });
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
          <span style={{ opacity: '0.5' }}>All Garages </span> &gt; {fullName}
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

          autoComplete="off"
          form={form}
        >
          <FirstInfo>
            <FirstLine>
              <FormItem
                label={
                  <span style={{
                    marginLeft: '15px',
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
                style={{
                  pointerEvents: 'none'
                }}
                name="name"
              >
                <Input style={{ border: "none", cursor: "default", pointerEvents: 'none' }} readOnly />
              </FormItem>
              <FormItem
                label={
                  <span style={{
                    marginLeft: '15px',
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
                style={{
                  pointerEvents: 'none'
                }}
                name="email"

              >
                <Input style={{ border: "none", cursor: "default", pointerEvents: 'none' }} readOnly />
              </FormItem>

              <FormItem
                label={
                  <span style={{
                    marginLeft: '15px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
                    Phone number
                  </span>
                }
                labelCol={{ span: 24 }}
                style={{
                  pointerEvents: 'none'
                }}
                name="phoneNumber"

              >
                <Input style={{ border: "none", cursor: "default", pointerEvents: 'none' }} readOnly />
              </FormItem>
            </FirstLine>

            <FirstLine>
              <FormItem
                label={
                  <span style={{
                    marginLeft: '15px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
                    Address
                  </span>
                }
                labelCol={{ span: 24 }}
                style={{
                  pointerEvents: 'none'
                }}
                name="address"

              >
                <Input style={{ border: "none", cursor: "default", pointerEvents: 'none' }} readOnly />
              </FormItem>
              <FormItem
                name="openTime"
                label={
                  <span style={{
                    marginLeft: '15px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
                    Open time
                  </span>
                }
                labelCol={{ span: 24 }}
                style={{
                  pointerEvents: 'none'
                }}
              >
                <StyledTimePicker
                  picker="time"
                  className="ant-select.ant-select-in-form-item"

                  format="HH:mm:ss"
                  defaultValue={''}
                  style={{ border: "none", cursor: "default", pointerEvents: 'none' }} inputReadOnly suffixIcon={null} readOnly
                />
              </FormItem>
              <FormItem
                name="closeTime"
                label={
                  <span style={{
                    marginLeft: '15px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
                    Close Time
                  </span>
                }
                labelCol={{ span: 24 }}
                style={{
                  pointerEvents: 'none'
                }}

              >
                <StyledTimePicker
                  dropdownClassName="my-dropdown-class"
                  className="ant-select.ant-select-in-form-item"

                  format="HH:mm:ss"
                  defaultValue={''}
                  style={{ border: "none", cursor: "default", pointerEvents: 'none' }} inputReadOnly suffixIcon={null} readOnly
                />
              </FormItem>
            </FirstLine>
            <SecondLine>
              <FormItem
                name="owner"
                label={
                  <span style={{
                    marginLeft: '15px',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#939393',
                  }}>
                    Garage owner
                  </span>
                }
                labelCol={{ span: 24 }}
                style={{
                  pointerEvents: 'none'
                }}
              >
                <Input
                  style={{ border: "none", cursor: "default", pointerEvents: 'none' }}
                  readOnly
                  value={data?.attributes?.owner?.data?.attributes?.name} // Lấy tên chủ sở hữu
                />
              </FormItem>
              <FormItem
                name="status"
                label={
                  <span style={{
                    marginLeft: '15px',
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
                style={{
                  pointerEvents: 'none'
                }}

              >
                <Input style={{ border: "none", cursor: "default", pointerEvents: 'none' }} readOnly />
              </FormItem>
            </SecondLine>
            <ThreeLine>
              <div className="title_formS">Garages</div>
              <FormSearch>
                <RightColumn style={{}}>

                  {Array.isArray(serviceValues) &&
                    serviceValues.map((service, index) => (
                      <div className='content_formS' key={index}>{getServiceNameById(service.id)}</div>
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
                <ButtonStyle htmlType="button"
                  onClick={() => handleDelete(userId)}>
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

