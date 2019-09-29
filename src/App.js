import React from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
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
    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/login'
                           render={() => <LoginPage/>}/>
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

const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default MainApp;