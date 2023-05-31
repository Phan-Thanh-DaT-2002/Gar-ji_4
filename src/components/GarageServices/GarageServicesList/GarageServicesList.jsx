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
  Modal,
  message,
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
      render: (_, __, index) => index + 1,
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
            .includes(value.toLowerCase())
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
    const isAdmin = data && data.type === 'admin'; 
   
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
            <h1 style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#111111',

            }}>All Garage Services</h1>
          </Col>
          <Col md={2}>
            <Button
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
                width: '105px',
                height: '48px',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '11.5px',
                lineHeight: '24px',
                alignItems: 'center',
                textAlign: 'center',
                color: '#F1F4F9',
              }}
              onClick={handleAdd}
            >
              Add Services
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
              pagination={{pageSize: 5}}
              columns={columns}
              dataSource={data}
              style={{
                    fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '13px',
                  lineHeight: '24px',
                  color: '#2F3A4C',
                  marginTop:'20px',
                  textAlign: 'center'
                  }} 
            ></Table>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default GarageServicesList;
