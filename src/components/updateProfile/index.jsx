import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  theme,
  Avatar,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Select,
} from 'antd';
import { ReactComponent as Ellipse3 } from '../../assets/images/Ellipse 3.svg';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import { DatePicker } from 'antd';
import { ReactComponent as Camera } from '../../assets/images/Camera/undefined/Vector.svg';

import dayjs from 'dayjs';
import './style.css';
import moment from 'moment';

// const schema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   dob: Yup.date().required('Date of birth is required'),
//   phone: Yup.string().required('Phone number is required'),
//   address: Yup.string().required('Address is required'),
// });

function UpdateProfile(props) {
  const { Option } = Select;
  const location = useLocation();
  const { data, role, userId } = location.state || {};
  console.log(data);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('form values:', values);
  };
  const onFinish = async values => {
    try {
      const jwt = localStorage.getItem('jwt');

      const raw = JSON.stringify({
        dob: values.dob.format('YYYY-MM-DD'),
        address: values.address,
        phoneNumber: values.phoneNumber,
      });

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        console.log('Response:', data);
        message.success('Form submitted successfully!');
      } else {
        console.error('Error:', data);
        message.error('Failed to submit form!');
      }
    } catch (error) {
      console.log(error);
      console.error('Error:', error);
      message.error('An error occurred');
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="profile">
          <div className="image">
            <AvatarContainer>
              <Avatar size={250} icon={<Ellipse2 />} />
              <Avatar size={250} icon={<Ellipse3 />} />
              <CameraAvatar size={50} icon={<Camera />} />
            </AvatarContainer>
          </div>
          <div className="infor">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ ...data, dob: dayjs(data.dob), role: role }}
              onFinish={onFinish}
              id="myForm"
            >
              <Form.Item label="Name" name="fullname" style={labelStyle}>
                <Input placeholder="" style={inputStyle} disabled />
              </Form.Item>
              <Form.Item label="Email" name="email" style={labelStyle}>
                <Input placeholder="" style={inputStyle} disabled />
              </Form.Item>
              <Form.Item label="Username" name="username" style={labelStyle}>
                <Input placeholder="" style={inputStyle} disabled />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="DOB" style={labelStyle} name="dob">
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Address" style={labelStyle} name="address">
                <Input placeholder="" style={inputStyle} />
              </Form.Item>
              <Form.Item label="Role" name="role" style={labelStyle}>
                {role.type === 'admin' ? (
                  <Select placeholder="" style={inputStyle}>
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                ) : (
                  <Input placeholder="" style={inputStyle} disabled />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="wrapper">
          <Button className="btn" id="save" htmlType="submit" form="myForm">
            Save
          </Button>
          <div style={{ width: '16px' }}></div>
          <Button className="btn" id="cancel">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
