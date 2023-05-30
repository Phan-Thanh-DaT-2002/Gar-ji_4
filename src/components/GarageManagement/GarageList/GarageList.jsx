import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Input, Select, Space, Table } from 'antd';
import './style.css';
import { useNavigate } from 'react-router';

const GarageManagementList = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState('Name');
  const [statusFilter, setStatusFilter] = useState('');
const handleView = (userId) => {
    navigate('/manager-details', { state: { userId: userId } });
  };
  const handleUpdate = (userId) => {
    navigate('/manager-update', { state: { userId: userId } });
  };
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
    {
      value: 'Phone',
      label: 'Phone',
    },
    {
      value: 'Owner',
      label: 'Owner',
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
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
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
      render: (data) => {

        console.log({
          data
        })
        return <span > {data.data.attributes.fullname} </span>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filteredValue: statusFilter ? [statusFilter] : null,
      filters: optionStatus,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => handleView(record.id)} />
          <EditOutlined onClick={() => handleUpdate(record.id)} />
          <DeleteOutlined />
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

    fetch("http://localhost:1337/api/garages?populate=owner", requestOptions)
      .then(response => response.json())
      .then(result => {
        const arrayNew = result.data.map(item => ({...item.attributes, id : item.id}))
       
        setData(arrayNew);
      })
      .catch(error => console.log('error', error));
  }, []);

  const handleSearch = value => {
    setSearchText(value);
  };

  const handleCategoryChange = value => {
    setSearchCategory(value);
  };

  const handleStatusFilter = value => {
    setStatusFilter(value);
  };

  return (
    <div style={{ padding: 24, minHeight: 360, background: '#F0F2F5' }}>
      <div>
        <Row>
          <Col md={22}>
            <h1>All Garages</h1>
          </Col>
          <Col md={2}>
            <Button
              type="primary"
              style={{ background: '#8767E1', marginRight: '10px' }}
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
                  defaultValue={searchCategory}
                  options={options}
                  onChange={handleCategoryChange}
                />
                <Search
                  placeholder="Search"
                  allowClear
                  onSearch={handleSearch}
                />
              </Space.Compact>
              <Space.Compact size="large">
                <Select
                  style={{ width: 224 }}
                  placeholder="Status"
                  options={optionStatus}
                  onChange={handleStatusFilter}
                />
              </Space.Compact>
            </Space>
            <Table
              columns={columns}
              dataSource={data}
              style={{ marginTop: 20 }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GarageManagementList;