import React from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import FindUsers from "./components/FindUsers/FindUsers";

const App = (props) => {
    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Sidebar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile'
                           render={() => <Profile />}/>
                    <Route path='/dialogs'
                           render={() => <Dialogs />}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/findusers'
                           render={() => <FindUsers/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                </div>
            </div>
    )
};

export default App;
