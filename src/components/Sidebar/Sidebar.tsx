import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from "antd";

const {Sider} = Layout;

const Sidebar: React.FC = () => {
    return (
        <Sider className="site-layout-background" width={200}>
            <Menu mode="inline"
                  style={{height: '100%'}}>
                <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/dialogs'>Dialogs</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/chat'>Chat</Link></Menu.Item>
                <Menu.Item key="4"><Link to='/news'>News</Link></Menu.Item>
                <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                <Menu.Item key="6"><Link to='/music'>Music</Link></Menu.Item>
                <Menu.Item key="7"><Link to='/settings'>Settings</Link></Menu.Item>
            </Menu>
        </Sider>
    )
};

export default Sidebar;