import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Space,
  Table,
  theme,
  Modal,
} from 'antd';

const GarageServicesList = () => {
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const { Search } = Input;

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
      render: record => (
        <Space size="middle">
          <EyeOutlined onClick={() => handleView(record.id)} />
          <EditOutlined onClick={() => handleUpdate(record.id)} />
          <DeleteOutlined onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
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
    filterParams['name][$contains]'] = searchText;
    const filters = Object.entries(filterParams)
      .map(([key, value]) => `filters[${key}]=${encodeURIComponent(value)}`)
      .join('&');
    const paginationParams = `pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`;

    const apiUrl = `http://localhost:1337/api/garage-services?${filters}&${paginationParams}`;
    console.log(filters);

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        const arrayNew = result.data.map(item => ({
          ...item.attributes,
          id: item.id,
        }));

        setData(arrayNew);
      })
      .catch(error => console.log('error', error));
  }, [searchText, pagination]);
  const handlePagination = (page, pageSize) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      page,
      pageSize,
    }));
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleAdd = () => {
    navigate('/create-services');
  };
  const handleView = userId => {
    navigate('/services-detail', { state: { userId: userId } });
  };
  const handleUpdate = userId => {
    navigate('/services-update', { state: { userId: userId } });
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

        fetch(
          `http://localhost:1337/api/garage-services/${record.id}`,
          requestOptions
        )
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
              All Garage Services
            </h1>
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
            ></Table>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default GarageServicesList;