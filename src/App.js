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

const App = (props) => {
    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Sidebar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs'
                           render={() => <Dialogs DialogsState={props.state.dialogs}
                                                  dispatch={props.dispatch}/>}/>
                    <Route path='/profile'
                           render={() => <Profile ProfileState={props.state.profile}
                                                  dispatch={props.dispatch}/>}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                </div>
            </div>
    )
};

export default App;
