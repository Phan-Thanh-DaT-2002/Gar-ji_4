import React from 'react';
import styled from 'styled-components';
// import * as Yup from 'yup';
import {
  theme,
  Avatar as AntAvatar,
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
} from 'antd';
import { ReactComponent as Ellipse3 } from '../../assets/images/Ellipse 3.svg';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import { ReactComponent as Camera } from '../../assets/images/Camera/undefined/Vector.svg';
import './style.css';

// const schema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   dob: Yup.date().required('Date of birth is required'),
//   phone: Yup.string().required('Phone number is required'),
//   address: Yup.string().required('Address is required'),
// });

function UpdateProfile(props) {
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

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('form values:', values);
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
              onFinish={onFinish}
              initialValues={{}}
              layout="vertical"
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
                <Input placeholder="ha.nguyen@gmail.com" disabled />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input placeholder="ha.nguyen" disabled />
              </Form.Item>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="DOB"
                    name="dob"
                    rules={[{ required: true }]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Role" name="role">
                <Input placeholder="Admin" disabled />
              </Form.Item>
              <hr class="hr-divider" />
              <Form.Item className="Button">
                <Button className="btn" htmlType="submit" id="save">
                  Save
                </Button>
                <Button className="btn" id="cancel">
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

{
  /* <div className="wrapper">
<Button className="btn" htmlType="submit" id="save">
  Save
</Button>
<div style={{ width: '16px' }}></div>
<Button className="btn" id="cancel">
  Cancel
</Button>
</div> */
}

export default UpdateProfile;
