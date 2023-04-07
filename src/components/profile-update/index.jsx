import React from 'react';
import { theme, Avatar, Form, Input, Button, DatePicker, Row, Col } from 'antd';
import { ReactComponent as Ellipse3 } from '../../assets/images/Ellipse 3.svg';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import { ReactComponent as Camera } from '../../assets/images/Camera/undefined/Vector.svg';
import './style.css';

function ProfileUpdate(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  const labelStyle = {
    color: '#939393',
    fontWeight: 'normal',
    marginBottom: 4,
  };

  const inputStyle = {
    width: 400,
    borderRadius: 8,
  };
  return (
    <div
      style={{
        padding: 24,
        minHeight: 600,
        background: colorBgContainer,
      }}
    >
      <div className="container">
        <div className="profile">
          <div className="avatar">
            <Avatar size={250} icon={<Ellipse2 />}></Avatar>
            <Avatar
              style={{ position: 'absolute' }}
              size={250}
              icon={<Ellipse3 />}
            />
            <Avatar
              style={{
                position: 'absolute',
                color: '#EEEEEE',
                background: 'rgba(0)',
              }}
              size={50}
              icon={<Camera />}
            />
          </div>
          <div className="infor">
            <Form form={form} layout="vertical">
              <Form.Item label="Name" style={labelStyle}>
                <Input placeholder="" style={inputStyle} />
              </Form.Item>
              <Form.Item label="Email" name="email" style={labelStyle}>
                <Input
                  placeholder="ha.nguyen@gmail.com"
                  style={inputStyle}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Username" name="username" style={labelStyle}>
                <Input placeholder="ha.nguyen" style={inputStyle} disabled />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="DOB" style={labelStyle}>
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Address" style={labelStyle}>
                <Input placeholder="" style={inputStyle} />
              </Form.Item>
              <Form.Item label="Role" name="role" style={labelStyle}>
                <Input placeholder="Admin" style={inputStyle} disabled />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="wrapper">
          <Button className="btn" id="save">
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
export default ProfileUpdate;
