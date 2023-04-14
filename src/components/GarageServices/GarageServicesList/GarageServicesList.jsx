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
  Select,
  Space,
  Table,
} from 'antd';
import '../../GarageServices/GarageServicesList/style.css';
const GarageServicesList = () => {
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
  const onSearch = value => console.log(value);
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
              <Space
                style={{
                  padding: '7px 11px',
                  fontSize: '16px',
                  lineHeight: 1.5,
                  border: '1px solid #d9d9d9',
                }}
              >
                <SearchOutlined style={{ width: '20%' }}></SearchOutlined>
              </Space>
              <Input style={{ width: '80%' }} placeholder="Search by name" />
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
