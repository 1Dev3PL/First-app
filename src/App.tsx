import React, {Suspense} from 'react';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import News from './components/News/NewsPage';
import Music from './components/Music/MusicPage';
import Settings from './components/Settings/Settings';
import LoginPage from './components/Login/LoginPage';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import store, {AppStateType} from './Redux/redux-store';
import UsersPage from './components/Users/UsersContainer';
import withSuspense from "./hoc/withSuspense";
import withAuthRedirect from "./hoc/withAuthRedirect";
import {Layout, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import HeaderComponent from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const {Content, Footer} = Layout;

const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage'));
const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));

/*const SuspendedProfile = withSuspense(ProfileLazy)
const SuspendedChat = withSuspense(ChatLazy)
const SuspendedDialogs = withSuspense(DialogsLazy)*/

/*const ProfilePage = withAuthRedirect(SuspendedProfile)
const ChatPage = withAuthRedirect(SuspendedChat)
const DialogsPage = withAuthRedirect(SuspendedDialogs)*/

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
                        <Sidebar/>
                        <Suspense fallback={<Preloader/>}>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                {/*для того чтобы рендерилось только крогда url полностью совпадает*/}
                                <Switch>
                                    <Route exact path='/'
                                           render={() => <Redirect to={'/profile'}/>}/>
                                    {/*В стрeлочных функциях, чтоб рендеровские пропсы не шли в withSuspense*/}
                                    <Route path='/profile/:userId?'
                                           render={() => <ProfilePage/>}/>
                                    <Route path='/dialogs'
                                           render={() => <DialogsPage/>}/>
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
                                           render={() => <ChatPage/>}/>
                                    <Route path='*'
                                           render={() => <div>404 NOT FOUND</div>}/>
                                </Switch>
                            </Content>
                        </Suspense>
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