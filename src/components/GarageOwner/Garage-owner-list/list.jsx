import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Space,
  Table,
  theme,
  Modal,
} from 'antd';
import '../../GarageOwner/Garage-owner-list/style.css';

const GarageOwnerList = () => {

  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('Name');
  const [isActived_2, setIsActived_2] = useState('Status');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const handleView = userId => {

    navigate('/owner-details', { state: { userId: userId } });
  };
  const handleUpdate = userId => {
    navigate('/owner-update', { state: { userId: userId } });
  };

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
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: record => (
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

    let filterParams = {};

    if (isActived_2 === 'Status') {
      filterParams = {};
    } else if (isActived_2 === 'Active') {
      filterParams['blocked'] = false;
    } else if (isActived_2 === 'Inactive') {
      filterParams['blocked'] = true;
    }

    if (isActived_1 === 'Name') {
      filterParams['fullname][$contains]'] = searchText;
    } else if (isActived_1 === 'Email') {
      filterParams['email][$contains]'] = searchText;
    }

    const filters = Object.entries(filterParams)
      .map(([key, value]) => `filters[${key}]=${encodeURIComponent(value)}`)
      .join('&');
    const paginationParams = `pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`;

    const apiUrl = `http://localhost:1337/api/users?${filters}&${paginationParams}`;

    fetch(apiUrl, requestOptions)

      .then(response => response.json())
      .then(result => {
        console.log(result);
        setUserData(result);
      })
      .catch(error => console.log('error', error));

  }, [searchText, isActived_1, isActived_2, pagination]);
  const handlePagination = (page, pageSize) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      page,
      pageSize,
    }));
  };

  const handleAdd = () => {
    navigate('/garage-owner-create');
  };
  const handleDelete = record => {
    Modal.confirm({
      title: 'Are you sure about that?',
      onOk: () => {
        if (isAdmin) {
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
        } else {
          message.error('You do not have permission to delete.');
        }
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
            <h1
              style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '32px',
                color: '#111111',
              }}
            >
              All Garage Owners
            </h1>
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
            <Table
              columns={columns}
              pagination={{
                current: pagination.page,
                pageSize: pagination.pageSize,
                total: userData.length,
                onChange: handlePagination,
              }}
              dataSource={userData.map((user, index) => ({
                ...user,
                STT: index + 1,
                blocked: user.blocked ? 'Inactive' : 'Active',
              }))}
              style={{ marginTop: 20 }}

            />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default GarageOwnerList;
