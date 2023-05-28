import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Input, Select, Space, Table, theme } from 'antd';
import '../../GarageOwner/Garage-owner-list/style.css';

const useHandleAdd = () => {
  const navigate = useNavigate();
  return () => {
    navigate('/garage-owner-create');
  };
};

const GarageOwnerList = () => {
  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('');
  const [isActived_2, setIsActived_2] = useState('');
  const { Search } = Input;
  const options = [
    {
      value: 'Name',
      label: 'Name',
    },
    {
      value: 'Email',
      label: 'Email',
    },
    {
      value: 'Phone',
      label: 'Phone',
    },
    {
      value: 'Actions',
      label: 'Actions',
    },
  ];
  const optionStatus = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'Inactive',
      label: 'Inactive',
    },
  ];
  const columns = [
    {
      title: '#',
      dataIndex: 'STT',
      key: 'STT',
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        if (String(isActived_1).toLowerCase().includes('username')) {
          return String(record.username)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (String(isActived_1).toLowerCase().includes('email')) {
          return String(record.email)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (String(isActived_1).toLowerCase().includes('phone')) {
          return String(record.phoneNumber)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else
          return String(record.username)
            .toLowerCase()
            .includes(value.toLowerCase());
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'blocked',
      key: 'blocked',
      filteredValue: [isActived_2],
      onFilter: (value, record) => {
        return record.blocked.includes(value);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined />
          <EditOutlined />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

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

  const handleAdd = () => {
    navigate('/garage-owner-create');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
      }}
    >
      <div>
        <Row>
          <Col md={22}>
            <h1>All Garage Owners</h1>
          </Col>
          <Col md={2}>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
              }}
            >
              Add owner
            </Button>
          </Col>
        </Row>
        <div>
          <Form>
            <Space>
              <Space.Compact size="large">
                <Select
                  style={{ width: '100px' }}
                  defaultValue="Name"
                  options={options}
                  onChange={value => {
                    setIsActived_1(value);
                  }}
                />
                <Search
                  placeholder="Search"
                  allowClear
                  onSearch={value => {
                    setSearchText(value);
                  }}
                />
              </Space.Compact>
              <Space.Compact size="large">
                <Select
                  style={{ width: 224 }}
                  placeholder="Status"
                  options={optionStatus}
                  onChange={value => {
                    setIsActived_2(value);
                  }}
                />
              </Space.Compact>
            </Space>
            
            <Table columns={columns} dataSource={userData && userData.map((user, id) => {
              return { ...user, STT: id + 1, blocked:user.blocked?'Inactive':'Active' }
            })} style={{ marginTop: 20 }} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GarageOwnerList;