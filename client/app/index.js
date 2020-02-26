import React from 'react';
import { render } from 'react-dom';

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
import Homework from './components/Homework/Homework';

render((

  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/materials" component={Materials}/>
        <Route exact path="/tests" component={Tests}/>
        <Route exact path="/homework" component={Homework}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
