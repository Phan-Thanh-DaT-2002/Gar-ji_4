import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar as AntAvatar,
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
import { ReactComponent as Camera } from '../../assets/images/Camera/undefined/Vector.svg';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './updateProfile.css';

const AvatarContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

const Avatar = styled(AntAvatar)`
  position: absolute;
  top: 0;
  left: 0;
`;

const CameraAvatar = styled(Avatar)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #eeeeee;
  background: rgba(0, 0, 0, 0);
`;

function UpdateProfile() {
  const { Option } = Select;
  const navigate = useNavigate();
  const location = useLocation();
  const { data, role, userId } = location.state || {};
  console.log(data);
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      const jwt = localStorage.getItem('jwt');
      console.log(values);
      const raw = JSON.stringify({
        fullname: values.fullname,
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
        navigate('/');
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

  const handleCancel = () => {
    navigate('/');
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
              initialValues={{
                ...data,
                name: data.fullname,
                dob: dayjs(data.dob),
                role: role,
              }}
              onFinish={onFinish}
              id="myForm"
            >
              <Form.Item label="Name" name="fullname">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="" disabled />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input placeholder="" disabled />
              </Form.Item>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item label="DOB" name="dob">
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Address" name="address">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Role" name="role">
                {role.type === 'admin' ? (
                  <Select placeholder="">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                ) : (
                  <Input placeholder="" disabled />
                )}
              </Form.Item>
              <hr class="hr-divider" />
              <Form.Item className="Button">
                <Button className="btn" htmlType="submit" id="save">
                  Save
                </Button>
                <Button
                  className="btn"
                  id="cancel"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
