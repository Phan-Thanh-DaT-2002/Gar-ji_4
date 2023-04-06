import { Avatar } from 'antd';
import '../avatar/style.css'
import { Dropdown, message, Space } from 'antd';
import { ReactComponent as Ellipse1 } from '../../assets/images/Ellipse 1.svg';
import React from 'react';
import { Typography } from 'antd';
const { Text} = Typography;
const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`); 
    // sửa sự kiện click Dropdown tại đây
    };
    const items = [
    {
        label: 'View profile',
        key: '1',
    },
    {
        label: 'Update profile',
        key: '2',
    },
    {
        label: 'Change password',
        key: '3',
    },
    {
        label: 'Log out',
        key: '4',
    },
    ];
    const Profile = () => (
    <Dropdown
        menu={{
        items,
        onClick,
        }}
    >
        <a onClick={(e) => e.preventDefault()}>
        <Space>
            <div style={{
                    display: 'flex',
                }}>
                <div><Avatar size="default" icon={<Ellipse1 />}></Avatar></div>
                <div style={{
                    margin: '0px 3px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Text strong>Ha Nguyen</Text>
                    <Text type="secondary">Admin</Text>
                </div>
            </div>
        </Space>
        </a>
    </Dropdown>
    );
export default Profile;