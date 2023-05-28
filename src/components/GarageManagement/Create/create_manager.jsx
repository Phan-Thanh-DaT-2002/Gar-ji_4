import React, { useEffect, useState } from 'react';
import { AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  AllDiv,
  DivForm,
  DivStyle,
  FirstInfo,
  FirstLine,
  FormItem,
  StyleSelect,
  SecondLine,
  FormSearch,
  ThreeLine,
  StyleInput,
  SCheckbox,
  StyleCheckBox,
  LeftColumn,
  RightColumn,
  MyDivider,
  ButtonStyle,
  StyledTimePicker,
  StyleCommentBox,
  StyledTextArea,
} from './index.js';
import { Form, Input, Select, Divider, message } from 'antd';
import moment from 'moment';

function CreateManager() {
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [garageOwners, setGarageOwners] = useState([]); // Chỉnh sửa tên biến thành 'setGarageOwners'

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      redirect: 'follow'
    };
  
    fetch("http://localhost:1337/api/users", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setGarageOwners(result); // Sửa thành setGarageOwners(result)
      })
      .catch(error => console.log('error', error));
  }, []);
  
  const onFinish = async (values) => {
    try {
      
      const jwt = localStorage.getItem('jwt');

      const openTime = moment(values.openTime).format('HH:mm:ss');
    const closeTime = moment(values.closeTime).format('HH:mm:ss');

    const raw = JSON.stringify({
      "data": {
        name: values.name,
        address: values.address,
        status: values.status,
        phoneNumber: values.phoneNumber,
        email: values.email,
        openTime: openTime,
        closeTime: closeTime,
        description: values.description,
        policy: values.policy,
        owner: values.owner,
        services: [],
      }
    });


      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(
        'http://localhost:1337/api/garages',
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        console.log('Response:', data);
        message.success('Form submitted successfully!');
        form.resetFields();
      } else {
        console.error('Error:', data);
        message.error('Failed to submit form!');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;

  const onCancel = () => {
    form.resetFields();
    window.history.back();
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [garagesData, setGaragesData] = useState([]);
    
   
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarages, setSelectedGarages] = useState([]);

  const [displayCount, setDisplayCount] = useState(5);

const handleSearchChange = (event) => {
setSearchTerm(event.target.value);
setDisplayCount(5);
};

const handleGarageChange = (garage) => {
const index = selectedGarages.findIndex((g) => g.id === garage.id);
if (index === -1) {
  setSelectedGarages([...selectedGarages, garage]);
} else {
  setSelectedGarages(selectedGarages.filter((g) => g.id !== garage.id));
}
};

const handleRemoveGarage = (garage) => {
setSelectedGarages(selectedGarages.filter((g) => g.id !== garage.id));
};
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      redirect: 'follow'
    };
  
    fetch("http://localhost:1337/api/garage-services", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setGaragesData(result.data);
      })
      .catch(error => console.log('error', error));
  }, []);
  
 
  
  const getGarageNameById = (garageId) => {
    const selectedGarage = garagesData.find((garage) => garage.id === garageId);
    return selectedGarage ? selectedGarage.attributes.name : '';
  };

  const filteredGarages = garagesData
    ? garagesData
        .filter((garage) => {
          const garageName = garage.attributes.name.toLowerCase();
          const searchTermLower = searchTerm.toLowerCase();
          return (
            garage.id.toString().includes(searchTermLower) ||
            garageName.includes(searchTermLower)
          );
        })
        .slice(0, displayCount)
    : [];


  return (
    <DivStyle>
      <AllDiv>
        <DivForm
          name="basic"
          id="my_Form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{}}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <FirstInfo>
            <FirstLine>
              <FormItem
                label="Name"
                labelCol={{ span: 24 }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input placeholder="Enter owner name" />
              </FormItem>
              <FormItem
                label="Email"
                labelCol={{ span: 24 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input placeholder="Enter owner email" />
              </FormItem>

              <FormItem
                label="Phone number"
                labelCol={{ span: 24 }}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                  {
                    pattern: /^[0-9]{10,}$/,
                    message: 'Please input a valid phone number!',
                  },
                ]}
              >
                <Input placeholder="Enter owner phone number" />
              </FormItem>
            </FirstLine>

            <FirstLine>
              <FormItem
                label="Address"
                labelCol={{ span: 24 }}
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input garage address!',
                  },
                ]}
              >
                <Input placeholder="Enter garage address" />
              </FormItem>
              <FormItem
                name="openTime"
                label="Open time"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select time!',
                  },
                ]}
              >
                <StyledTimePicker
                  picker="time"
                  dropdownClassName="my-dropdown-class"
                  className="ant-select.ant-select-in-form-item"
                  placeholder="Select open time"
                  format="HH:mm:ss"
                  defaultValue={''}
                />
              </FormItem>
              <FormItem
                name="closeTime"
                label="Close time"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select time!',
                  },
                ]}
              >
                <StyledTimePicker
                  dropdownClassName="my-dropdown-class"
                  className="ant-select.ant-select-in-form-item"
                  placeholder="Select close time"
                  format="HH:mm:ss"
                  defaultValue={''}
                />
              </FormItem>
            </FirstLine>
            <SecondLine>
              <FormItem
                name="owner"
                label="Select a garage owner"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a garage owner!',
                  },
                ]}
              >
                <StyleSelect placeholder="Select a garage owner" allowClear={false}>
                {garageOwners.map((owner) => (
      <Option key={owner.id} value={owner.id}>
        {owner.name}
      </Option>
    ))}
</StyleSelect>
              </FormItem>
              <FormItem
                name="status"
                label="Status"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a status!',
                  },
                ]}
              >
                <StyleSelect placeholder="Select a status" allowClear={false}>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </StyleSelect>
              </FormItem>
            </SecondLine>
            <StyleCommentBox>
              <FormItem
                label="Description"
                labelCol={{ span: 24 }}
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input description',
                  },
                ]}
              >
                <StyledTextArea
                  autoSize={{ minRows: 4, maxRows: 30 }}
                  placeholder="Enter a description"
                />
              </FormItem>
              <FormItem
                label="Policy"
                labelCol={{ span: 24 }}
                name="policy"
                rules={[
                  {
                    required: true,
                    message: 'Please input policy',
                  },
                ]}
              >
                <StyledTextArea
                  autoSize={{ minRows: 4, maxRows: 30 }}
                  placeholder="Enter a policy"
                />
              </FormItem>
            </StyleCommentBox>

            <ThreeLine>
    <div className="title_formS">Garages</div>
    <FormSearch>
      <LeftColumn>
        <StyleInput
          placeholder="Search for garages..."
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SCheckbox>
          {filteredGarages.map((garage) => (
            <div key={garage.id}>
              <StyleCheckBox
                checked={selectedGarages.some((g) => g.id === garage.id)}
                onChange={() => handleGarageChange(garage)}
              >
                {garage.attributes.name} 
              </StyleCheckBox>
            </div>
          ))}
        </SCheckbox>
      </LeftColumn>
      <MyDivider type="vertical" />
      <RightColumn>
        <div className="select_gara">Select garages ({selectedGarages.length})</div>
        {selectedGarages.map((garage) => (
          <div className="select_remove" key={garage.id}>
            <span>{getGarageNameById(garage.id)}</span>
            <DeleteOutlined
              style={{ fontSize: '24px' }}
              onClick={() => handleRemoveGarage(garage)}
            />
          </div>
        ))}
      </RightColumn>
    </FormSearch>
  </ThreeLine>
            <div className="Btns">
              <Divider style={{ border: '1px solid #DDE4EE', margin: 0 }} />
              <div className="btn-button">
                <ButtonStyle
                  type="primary"
                  style={{ background: '#8767E1' }}
                  htmlType="submit"
                >
                  <span>Save</span>
                </ButtonStyle>
                <ButtonStyle htmlType="button" onClick={onCancel}>
                  <span>Cancel</span>
                </ButtonStyle>
              </div>
            </div>
          </FirstInfo>
        </DivForm>
      </AllDiv>
    </DivStyle>
  );
}

export default CreateManager;