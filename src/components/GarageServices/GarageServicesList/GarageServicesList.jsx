import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, { useEffect } from 'react';
import {
  Form,
  theme,
  Button,
  Row,
  Col,
  Input,
  Tooltip,
  Space,
  Table,
} from 'antd';
import '../../GarageServices/GarageServicesList/style.css';
import { useState } from 'react';
import '../GarageServicesList/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
const GarageServicesList = () => {
  const location = useLocation(); // Sử dụng useLocation từ react-router-dom
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null)
  const handleAdd = () => {
    navigate('/create-services');
  };
  const handleView = (userId) => {
    navigate('/services-detail', { state: { userId: userId } });
  };
  const handleUpdate = (userId) => {
    navigate('/services-update', { state: { userId: userId } });
  };
  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('');
  const { Search } = Input;
  const options = [
    {
      value: 'Name',
      label: 'Name',
    },
    {
      value: 'Description',
      label: 'Description',
    },
    {
      value: 'Min price',
      label: 'Min price',
    },
    {
      value: 'Max price',
      label: 'Max price',
    },
    {
      value: 'Actions',
      label: 'Actions',
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
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.minPrice).toLowerCase().includes(value.toLowerCase()) ||
          String(record.maxPrice).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
    {
      title: 'Min price',
      dataIndex: 'minPrice',
      key: 'minPrice',
    },
    {
      title: 'Max price',
      dataIndex: 'maxPrice',
      key: 'maxPrice',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
           <EyeOutlined onClick={() => handleView(record.id)} />
           <EditOutlined onClick={() => handleUpdate(record.id)} />
          <DeleteOutlined></DeleteOutlined>
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

    fetch("http://localhost:1337/api/garage-services?populate=garages", requestOptions)
      .then(response => response.json())
      .then(result => {
        const arrayNew = result.data.map(item => ({...item.attributes, id : item.id, }))
       
        setData(arrayNew);
      })
      .catch(error => console.log('error', error));
  }, []);
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
            <h1>All Garage Services</h1>
          </Col>
          <Col md={2}>
            <Button
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
                
              }}
              onClick={handleAdd}
            >
              Add services
            </Button>
          </Col>
        </Row>
        <div>
          <Form>
            <Space.Compact size="large">
              <Search
                prefix={<SearchOutlined />}
                className="search-btn"
                placeholder="Search"
                allowClear
                onSearch={value => {
                  setSearchText(value);
                }}
              />
            </Space.Compact>
            <Table
              columns={columns}
              dataSource={data}
              style={{ marginTop: 20 }}
            ></Table>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default GarageServicesList;
