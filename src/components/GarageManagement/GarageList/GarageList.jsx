import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Input, Select, Space, Table, theme, Modal } from 'antd';
import './style.css';
import { useNavigate } from 'react-router';

const GarageManagementList = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/create-manager');
  };
  const [searchCategory, setSearchCategory] = useState('Name');
  const [statusFilter, setStatusFilter] = useState('');
const handleView = (userId) => {
    navigate('/manager-details', { state: { userId: userId } });
  };
  const handleUpdate = (userId) => {
    navigate('/manager-update', { state: { userId: userId } });
  };
  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('');
  const [isActived_2, setIsActived_2] = useState('');
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
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        if (String(isActived_1).toLowerCase().includes('name')) {
          return String(record.name)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (String(isActived_1).toLowerCase().includes('email')) {
          return String(record.email)
            .toLowerCase()
            .includes(value.toLowerCase());
        } else
          return String(record.name)
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
      title: 'Garage owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (data) => {
        if (data && data.data && data.data.attributes && data.data.attributes.fullname) {
          return <span>{data.data.attributes.fullname}</span>;
        } else {
          return null;
        }
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filteredValue: [isActived_2],
      onFilter: (value, record) => {
        if (value === 'Status') {
          return record.status.includes('');
        } else return record.status.includes(value);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => handleView(record.id)} />
          <EditOutlined onClick={() => handleUpdate(record.id)} />
          <DeleteOutlined onClick={()=> handleDelete(record)}/>
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

    fetch("http://localhost:1337/api/garages?populate=owner, services", requestOptions)
    .then(response => response.json())
    .then(result => {
      const arrayNew = result.data.map(item => {
        if (item.owner && item.owner.data && item.owner.data.attributes && item.owner.data.attributes.fullname) {
          return { ...item.attributes, id: item.id, owner: item.owner.data.attributes.fullname };
        } else {
          return { ...item.attributes, id: item.id, owner: null };
        }
      });
      setData(arrayNew);
    })
    .catch(error => console.log('error', error));
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            <h1 style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#111111',

            }}>All Garages</h1>
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
              dataSource={data}
              pagination={{pageSize: 5}}
              style={{
                    fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '13px',
                  lineHeight: '24px',
                  color: '#2F3A4C',
                marginTop:'20px'
                  }} 
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GarageManagementList;