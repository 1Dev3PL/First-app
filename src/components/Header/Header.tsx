import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {getIsAuthSelector, getLoginSelector} from "../../Redux/auth-selectors";
import style from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import {Link} from "react-router-dom";
import {Col, Image, Layout, Button, Avatar, Row} from "antd";

const {Header} = Layout;

const HeaderComponent: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    const login = useSelector(getLoginSelector)

    const dispatch = useDispatch()

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Image src={logo} alt='Jopa' width={100} preview={false}/>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}>
                            {login}
                        </Col>
                        <Col span={2}>
                            <Avatar>U</Avatar>
                        </Col>
                        <Col span={3}>
                            <Button onClick={() => dispatch(logOut())}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Log in</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>
    )
}

export default HeaderComponent