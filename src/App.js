import React from 'react';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import store from './Redux/redux-store';
import UsersContainer from './components/Users/UsersContainer';
import withSuspense from "./hoc/withSuspense";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert('Some error occured')
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
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Sidebar/>
                <div className={'app-wrapper-content'}>
                    {/*для того чтобы рендерилось только крогда url полностью совпадает*/}
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/news'
                               render={() => <News/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer title='Users'/>}/>
                        <Route path='/music'
                               render={() => <Music/>}/>
                        <Route path='/settings'
                               render={() => <Settings/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer =
    compose(
        withRouter,
        connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
};

export default MainApp;