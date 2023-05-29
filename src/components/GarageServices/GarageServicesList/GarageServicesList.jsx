import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React from 'react';
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
const GarageServicesList = () => {
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
      dataIndex: 'STT',
      key: 'STT',
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
          <EyeOutlined></EyeOutlined>
          <EditOutlined></EditOutlined>
          <DeleteOutlined></DeleteOutlined>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      STT: '1',
      name: 'John a',
      description: 'This is description',
      minPrice: '30000',
      maxPrice: '200000',
    },
    {
      key: '2',
      STT: '2',
      name: 'John Doe',
      description: 'This is description',
      minPrice: '10000',
      maxPrice: '200000',
    },
  ];
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
