import React from 'react';
import {render} from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import Login from './components/Login/Login';
import NotFound from './components/App/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/SignUp/SignUp';
import Materials from './components/Materials/Materials';
import Tests from './components/Tests/Tests';
import Questions from './components/Questions/Questions';
import Homework from './components/Homework/Homework';
import logo from "../public/assets/img/EduLogo.png";
import SideBar from './components/SideBar/SideBar';

const sitesAfterLogin = [
  '/dashboard',
  '/signup',
  '/materials',
  '/tests',
  '/questions',
  '/homework'
];


render((
  <Router>
    <App>
      <Route path={sitesAfterLogin} component={SideBar} />
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/materials" component={Materials}/>
        <Route path="/tests" component={Tests}/>
        <Route path="/questions" component={Questions}/>
        <Route path="/homework" component={Homework}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
