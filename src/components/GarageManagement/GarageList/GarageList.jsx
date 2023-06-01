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
import './style.css';

const GarageManagementList = () => {
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState('Name');
  const [statusFilter, setStatusFilter] = useState('');
  const handleView = userId => {
    navigate('/manager-details', { state: { userId: userId } });
  };
  const handleUpdate = userId => {
    navigate('/manager-update', { state: { userId: userId } });
  };
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
      value: 'name',
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
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
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
      dataIndex: 'name',
      key: 'name',
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
      title: 'Garage owner',
      dataIndex: 'owner',
      key: 'owner,',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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

  const [data, setData] = useState([]);
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
      filterParams['status][$contains]'] = 'active';
    } else if (isActived_2 === 'Inactive') {
      filterParams['status][$contains]'] = 'inactive';
    }

    if (isActived_1 === 'Name') {
      filterParams['name][$contains]'] = searchText;
    } else if (isActived_1 === 'Email') {
      filterParams['email][$contains]'] = searchText;
    }

    const filters = Object.entries(filterParams)
      .map(([key, value]) => `filters[${key}]=${encodeURIComponent(value)}`)
      .join('&');
    const paginationParams = `pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`;

    const apiUrl = `http://localhost:1337/api/garages?${filters}&${paginationParams}`;

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.data);
        if (result.data) {
          const arrayNew = result.data.map(item => ({
            ...item.attributes,
          }));
          console.log(arrayNew);
          setData(arrayNew);
        }
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
  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //     redirect: 'follow',
  //   };

  //   fetch('http://localhost:1337/api/garages?populate=owner', requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       const arrayNew = result.data.map(item => ({
  //         ...item.attributes,
  //         id: item.id,
  //       }));
  //       console.log(arrayNew);
  //       setData(arrayNew);
  //     })
  //     .catch(error => console.log('error', error));
  // }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleAdd = () => {
    navigate('/manager-create');
  };
  const handleDelete = record => {
    Modal.confirm({
      title: 'Are you sure about that?',
      onOk: () => {
        setData(prevData => {
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

        fetch(`http://localhost:1337/api/garages/${record.id}`, requestOptions)
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
    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
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
              All Garages
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
                fontSize: '12.3px',
                lineHeight: '24px',
                alignItems: 'center',
                textAlign: 'center',
                color: '#F1F4F9',
              }}
            >
              Add Garage
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
                total: data.length,
                onChange: handlePagination,
              }}
              dataSource={data.map((data, index) => ({
                ...data,
                STT: index + 1,
              }))}
              style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '13px',
                lineHeight: '24px',
                color: '#2F3A4C',
                marginTop: '20px',
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GarageManagementList;
