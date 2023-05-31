import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../shared/services/http-client';
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
  Pagination,
} from 'antd';
import '../../GarageOwner/Garage-owner-list/style.css';
import { async } from 'q';

const useHandleAdd = () => {
  const navigate = useNavigate();
  return () => {
    navigate('/garage-owner-create');
  };
};

const GarageOwnerList = () => {
  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('Name');
  const [isActived_2, setIsActived_2] = useState('Status');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
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
          <EyeOutlined />
          <EditOutlined />
          <DeleteOutlined
            onClick={() => {
              handleDelete(record);
            }}
          />
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
    console.log(filters);

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
