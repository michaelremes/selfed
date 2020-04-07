import React from 'react';
import {render} from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import App from './components/App/App';
import Login from './components/Login/Login';
import NotFound from './components/App/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/Users/SignUp';
import Users from './components/Users/Users';
import Materials from './components/Materials/Materials';
import Tests from './components/Tests/Tests';
import CreateTest from './components/Tests/CreateTest';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/Questions/CreateQuestion';
import Homework from './components/Homework/Homework';
import SideBar from './components/SideBar/SideBar';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';


import Provider from "react-redux/lib/components/Provider";
import {createStore} from 'redux';
import allReducers from "./reducer/allReducers";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const sitesAfterLogin = [
  '/dashboard',
  '/add/user',
  '/users',
  '/materials',
  '/tests',
  '/add/test',
  '/add/question',
  '/questions',
  '/homework'
];



render((
  <Provider store={store}>
  <Router>
    <App>
      <Route path={sitesAfterLogin} component={SideBar} />;
      <Switch>
        <Route exact path='/' component={Login}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path="/add/user" component={SignUp}/>
        <PrivateRoute path="/users" component={Users}/>
        <PrivateRoute path="/materials" component={Materials}/>
        <PrivateRoute path="/tests" component={Tests}/>
        <PrivateRoute path="/add/test" component={CreateTest}/>
        <PrivateRoute path="/add/question" component={CreateQuestion}/>
        <PrivateRoute path="/questions" component={Questions}/>
        <PrivateRoute path="/homework" component={Homework}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
  </Provider>
), document.getElementById('root'));
