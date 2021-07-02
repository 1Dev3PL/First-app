import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {selectLogin, selectIsAuth} from "../../Redux/auth-selectors";
import style from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import {Link} from "react-router-dom";
import {Col, Image, Layout, Button, Avatar, Row} from "antd";
import {selectProfilePhoto} from "../../Redux/profile-selectors";
import userPhoto from "../../assets/images/userPhoto.png"

const {Header} = Layout;

const HeaderComponent: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    const photo = useSelector(selectProfilePhoto)

    const dispatch = useDispatch()

    return (
        <Header className="header">
            <Row align={"middle"}>
                <Col span={2} className={style.image}>
                    <Image src={logo} alt='Dev Soc' width={100} preview={false}/>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1} offset={18}>
                            <span style={{color: 'white'}}>{login}</span>
                        </Col>
                        <Col span={1}>
                            <Avatar src={photo || userPhoto} />
                        </Col>
                        <Col span={1} offset={1}>
                            <Button onClick={() => dispatch(logOut())}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={1} offset={21}>
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