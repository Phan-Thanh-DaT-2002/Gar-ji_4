import React, { useEffect, useState } from 'react';
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
  Modal,
} from 'antd';
import { ReactComponent as Ellipse3 } from '../../assets/images/Ellipse 3.svg';
import { ReactComponent as Ellipse2 } from '../../assets/images/Ellipse 2.svg';
import { ReactComponent as Camera } from '../../assets/images/Camera/Vector.svg';
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

const AvatarImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: #bebcbc solid;
`;

const CameraAvatar = styled(Avatar)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #eeeeee;
  background: rgba(0, 0, 0, 0);
`;

const BlackClover = styled(AntAvatar)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

function UpdateProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { Option } = Select;
  const navigate = useNavigate();
  const location = useLocation();
  const { data, role, userId } = location.state || {};
  // console.log(data);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const jwt = localStorage.getItem('jwt');

        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          redirect: 'follow',
        };

        const response = await fetch(
          'http://localhost:1337/api/users/me?populate=avatar',
          requestOptions
        );
        const result = await response.json();

        if (response.ok) {
          console.log('Avatar:', result.avatar);
          console.log('url:', result.avatar.url);
          setAvatar(result.avatar.url);
          console.log('avatar:', `http://localhost:1337${avatar}`);

          // Gọi callback function để thông báo về việc thay đổi ảnh
        } else {
          console.error('Failed to fetch profile:', result);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchProfile();
  }, []);

  const onFinish = async values => {
    try {
      const jwt = localStorage.getItem('jwt');
      const { dob, address, phoneNumber } = values;

      if (uploadedImage) {
        // Nếu có ảnh mới được chọn, thực hiện tải lên ảnh
        const formdata = new FormData();
        formdata.append('ref', 'plugin::users-permissions.user');
        formdata.append('refId', userId);
        formdata.append('field', 'avatar');
        formdata.append('files', uploadedImage);

        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: formdata,
          redirect: 'follow',
        };

        const response = await fetch(
          'http://localhost:1337/api/upload',
          requestOptions
        );
        const uploadResult = await response.json();

        if (response.ok) {
          console.log('Image uploaded:', uploadResult);
          // Tiếp tục cập nhật thông tin số điện thoại và các thông tin khác
        } else {
          console.log('Image upload failed:', uploadResult);
          message.error('Failed to upload image!');
        }
      }

      // Cập nhật thông tin số điện thoại và các thông tin khác (bao gồm cả khi không có ảnh mới)
      const raw = JSON.stringify({
        dob: dob.format('YYYY-MM-DD'),
        address,
        phoneNumber,
      });

      const updateRequestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: raw,
        redirect: 'follow',
      };

      const updateResponse = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        updateRequestOptions
      );
      const data = await updateResponse.json();
      if (updateResponse.ok) {
        console.log('Response:', data);
        message.success('Form submitted successfully!');

        navigate('/');

        // Load lại trang
        window.location.reload();
      } else {
        message.error('Failed to submit form!');
      }
    } catch (error) {
      message.error('An error occurred');
    }
  };

  const handleCancelForm = () => {
    navigate('/');
  };

  const handlePreviewAvatar = e => {
    const file = e.target.files[0];
    setUploadedImage(file);
    setIsModalOpen(false);
  };

  const onOk = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="profile">
          <div className="image">
            <AvatarContainer>
              {uploadedImage ? (
                <AvatarImage
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Avatar"
                />
              ) : (
                <>
                  {avatar ? (
                    <AvatarImage src={`http://localhost:1337${avatar}`} />
                  ) : (
                    <Avatar
                      size={250}
                      icon={<Ellipse2 />}
                      onClick={showModal}
                    ></Avatar>
                  )}
                </>
              )}
              <Modal
                title="Update Avatar"
                visible={isModalOpen}
                onOk={onOk}
                onCancel={handleCancel}
              >
                <input type="file" onChange={handlePreviewAvatar} />
              </Modal>
              <BlackClover size={250} icon={<Ellipse3 />} onClick={showModal} />
              <CameraAvatar size={50} icon={<Camera />} onClick={showModal} />
            </AvatarContainer>
          </div>
          <div className="infor">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                ...data,
                dob: dayjs(data.dob),
                role: role,
              }}
              onFinish={onFinish}
              id="myForm"
              size="large"
            >
              <Form.Item label="Name" name="fullname">
                <Input placeholder="" disabled />
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
                {data.role.type === 'admin' ? (
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
                <Button
                  className="btn"
                  htmlType="submit"
                  id="save"
                  size="large"
                >
                  Save
                </Button>
                <Button
                  className="btn"
                  id="cancel"
                  size="large"
                  onClick={() => handleCancelForm()}
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
