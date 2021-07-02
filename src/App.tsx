import React from 'react';
import {HashRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import LoginPage from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import store, {AppStateType} from './Redux/redux-store';
import UsersPage from './components/Users/UsersContainer';
import withSuspense from "./hoc/withSuspense";
import withAuthRedirect from "./hoc/withAuthRedirect";
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import HeaderComponent from "./components/Header/Header";

const {Content, Footer, Sider} = Layout;

const ProfileContainer = React.lazy(() => import('./components/Profile/Profile'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsPage'));
const ChatContainer = React.lazy(() => import('./pages/chat/ChatPage'));

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChat = withSuspense(ChatContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)
const ProfileWithAuthRedirectHOC = withAuthRedirect(SuspendedProfile)
const ChatWithAuthRedirectHOC = withAuthRedirect(SuspendedChat)
const DialogsWithAuthRedirectHOC = withAuthRedirect(SuspendedDialogs)

type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<PropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <HeaderComponent/>
                <Content style={{padding: '0 30px'}}>
                    <Breadcrumb style={{marginTop: '16px', padding: '0 30px'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '16px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu mode="inline"
                                  defaultSelectedKeys={['1']}
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
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            {/*для того чтобы рендерилось только крогда url полностью совпадает*/}
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={'/profile'}/>}/>
                                {/*В стрeлочных функциях, чтоб рендеровские пропсы не шли в withSuspense*/}
                                <Route path='/profile/:userId?'
                                       render={() => <ProfileWithAuthRedirectHOC/>}/>
                                <Route path='/dialogs'
                                       render={() => <DialogsWithAuthRedirectHOC/>}/>
                                <Route path='/news'
                                       render={() => <News/>}/>
                                <Route path='/users'
                                       render={() => <UsersPage/>}/>
                                <Route path='/music'
                                       render={() => <Music/>}/>
                                <Route path='/settings'
                                       render={() => <Settings/>}/>
                                <Route path='/login'
                                       render={() => <LoginPage/>}/>
                                <Route path='/chat'
                                       render={() => <ChatWithAuthRedirectHOC/>}/>
                                <Route path='*'
                                       render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Dev Soc ©2021 Created by 1Dev3PL</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
});

let AppContainer =
    compose<React.ComponentType>(
        withRouter,
        connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
};

export default MainApp;