import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Input, Select, Space, Table, theme, Modal } from 'antd';
import '../../GarageOwner/Garage-owner-list/style.css';


const GarageOwnerList = () => {

  const location = useLocation();

  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null)
  const handleView = (userId) => {
    navigate('/owner-details', { state: { userId: userId } });
  };
  const handleUpdate = (userId) => {
    navigate('/owner-update', { state: { userId: userId } });
  };

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
  ];
  const optionStatus = [
    {
      value: 'Status',
      label: 'Status',
    },
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
      filteredValue: [filterValue],
      onFilter: (value, record) => {
        if (String(isActived_1).toLowerCase().includes('username')) {
          return String(record.username)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (String(isActived_1).toLowerCase().includes('email')) {
          return String(record.email)
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
        if (value === 'Status') {
          return record.blocked.includes('');
        } else return record.blocked.includes(value);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => handleView(record.id)} />
          <EditOutlined onClick={() => handleUpdate(record.id)} />
          <DeleteOutlined onClick={() => handleDelete(record)} />
        </Space>

      ),
    },
  ];
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
  
    let url = 'http://localhost:1337/api/users';
    if (filterField === 'Name') {
      url += `?username=${filterValue}`;
    } else if (filterField === 'Email') {
      url += `?email=${filterValue}`;
    }
  
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setUserData(result);
      })
      .catch(error => console.log('error', error));
  }, [filterField, filterValue]);

  const handleAdd = () => {
    navigate('/garage-owner-create');
  };
  const handleDelete = record => {
    Modal.confirm({
      title: 'Are you sure about that?',
      onOk: () => {
        setUserData(prevData => {
          return prevData.filter(data => data.id !== record.id);
        });

        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };


        fetch(`http://localhost:1337/api/users/${record.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (!result.success) {
              console.log('Error deleting user');
            }
          })
          .catch(error => console.log('Error deleting user', error));
      },
    });
  };
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
            <h1 style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#111111',

            }}>All Garage Owners</h1>
          </Col>
          <Col md={2}>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
                width: '105px',
                height: '48px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '13px',
                lineHeight: '24px',
                alignItems: 'center',
                textAlign: 'center',
                color: '#F1F4F9',
              }}
            >
              Add owner
            </Button>
          </Col>
        </Row>
        <div>
          <Form>
            <Space >
              <Space.Compact size="large">
                <Select
                  style={{ width: '100px' }}
                  defaultValue="Name"
                  options={options}
                  onChange={value => {
                    setFilterField(value);
                  }}
                />
                <Search
                  placeholder="Search"
                  allowClear
                  onSearch={value => {
                    setFilterValue(value);
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

            <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={userData && userData.map((user, id) => {
              return { ...user, STT: id + 1, blocked: user.blocked ? 'Inactive' : 'Active' }
            })} style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '13px',
              lineHeight: '24px',
              color: '#2F3A4C',
              marginTop: '20px'
            }} />

          </Form>
        </div>
      </div>
    </div>
  );
};

export default GarageOwnerList;