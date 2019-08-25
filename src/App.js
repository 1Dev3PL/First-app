import React from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dialogs from './components/Dialogs/Dialogs';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import FindUsers from "./components/FindUsers/FindUsers";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {
    return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Sidebar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <Dialogs />}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/users'
                           render={() => <FindUsers/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                </div>
            </div>
    )
};

export default App;
