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
  Avatar,
  message,
} from 'antd';
import './style.css';
import { ReactComponent as Ellipse1 } from '../../../assets/images/Ellipse 1.svg';

const GarageManagementList = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarIds, setAvatarIds] = useState(null);
  const handleView = userId => {
    navigate('/manager-details', { state: { userId: userId } });
  };
  const handleUpdate = userId => {
    navigate('/manager-update', { state: { userId: userId } });
  };
  const [searchText, setSearchText] = useState('');
  const [isActived_1, setIsActived_1] = useState('Name');
  const [isActived_2, setIsActived_2] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalItems, setTotalItems] = useState(0);
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
      value: '',
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
    const fetchData = async () => {
      try {
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
        if (isActived_2 === '') {
        } else if (isActived_2 === 'active') {
          filterParams['status][$eq]'] = 'active';
        } else if (isActived_2 === 'inactive') {
          filterParams['status][$eq]'] = 'inactive';
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
        const apiUrl = `http://localhost:1337/api/garages?${filters}&${paginationParams}&populate=owner, `;
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        if (response.ok) {
          const arrayNew = result.data.map(item => ({
            ...item.attributes,
            id: item.id,
          }));
          setData(arrayNew);
          console.log(data);
          setTotalItems(result.meta.pagination.total);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [searchText, isActived_1, isActived_2, pagination]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };
        const apiUrl = `http://localhost:1337/api/garages?populate[owner][populate]=*`;
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        console.log('aaa', result);
        if (response.ok) {
          const urlArray = result.data.map(item => ({
            avatarUrl:
              item.attributes.owner.data?.attributes?.avatar?.data?.attributes
                ?.url,
            id: item.id,
          }));
          console.log('avt', urlArray[0].id);
          setAvatar(urlArray);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [data]);

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
    navigate('/manager-create');
  };
  const handleDelete = record => {
    Modal.confirm({
      title: 'Are you sure about that?',
      okText: 'Yes',
      cancelText: 'No',
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
          .then(response => {
            response.json();
            message.success('delete success');
          })
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
                total: totalItems,
                onChange: handlePagination,
              }}
              dataSource={data.map((data, index) => ({
                ...data,
                id: data.id,
                owner: (
                  <>
                    <Avatar
                      size={32}
                      src={
                        avatar &&
                          avatar[avatar.findIndex(item => item.id === data.id)]
                            ?.avatarUrl ? (
                          `http://localhost:1337${avatar[
                            avatar.findIndex(item => item.id === data.id)
                          ]?.avatarUrl
                          }`
                        ) : (
                          <Avatar size={32} icon={<Ellipse1 />}></Avatar>
                        )
                      }
                      alt="avatar"
                    />
                    <span style={{ marginLeft: '5px' }}>
                      {data.owner?.data?.attributes?.fullname || ''}
                    </span>
                  </>
                ),
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
