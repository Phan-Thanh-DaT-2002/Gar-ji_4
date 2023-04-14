import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import {
  Form,
  theme,
  Button,
  Row,
  Col,
  Input,
  Select,
  Space,
  Table,
} from 'antd';
import '../../GarageManagement/GarageList/style.css';
const GarageManagementList = () => {
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
    {
      value: 'Phone',
      label: 'Phone',
    },
    {
      value: 'Status',
      label: 'Status',
    },
    {
      value: 'Actions',
      label: 'Actions',
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
      dataIndex: 'STT',
      key: 'STT',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
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
      dataIndex: 'GarageOwner',
      key: 'GarageOwner',
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
      name: 'John Doe',
      email: 'abc.ab@gmail.com',
      phoneNumber: '0912 234 456',
      GarageOwner: 'Quang Minh Tran',
      status: 'Active',
    },
    {
      key: '2',
      STT: '2',
      name: 'John Doe',
      email: 'abc.ab@gmail.com',
      phoneNumber: '0912 234 456',
      GarageOwner: 'Quang Minh Tran',
      status: 'Inactive',
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
            <h1>All Garage</h1>
          </Col>
          <Col md={2}>
            <Button
              type="primary"
              style={{
                background: '#8767E1',
                marginRight: '10px',
              }}
            >
              Add garage
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
                />
                <Search placeholder="Search" allowClear />
              </Space.Compact>
              <Space.Compact size="large">
                <Select
                  style={{ width: 224 }}
                  placeholder="Status"
                  options={optionStatus}
                />
              </Space.Compact>
            </Space>
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
export default GarageManagementList;
