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
import AddUser from './components/Users/AddUser';
import Users from './components/Users/Users';
import Materials from './components/Materials/Materials';
import Tests from './components/Tests/Tests';
import CreateTest from './components/Tests/CreateTest';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/Questions/CreateQuestion';
import Homework from './components/Homework/Homework';
import StudentTests from "./components/Tests/StudentTests";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import SideBar from './components/SideBar/SideBar';
import {TeacherPrivateRoute, StudentPrivateRoute} from './components/PrivateRoute/PrivateRoute';


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
  '/homework',
  '/student/tests',
  '/student/dashboard'
];



render((
  <Provider store={store}>
  <Router>
    <App>
      <Route path={sitesAfterLogin} component={SideBar} />
      <Switch>
        <Route exact path='/' component={Login}/>
        <TeacherPrivateRoute path='/dashboard' component={Dashboard}/>

        <TeacherPrivateRoute path="/add/user" component={AddUser}/>
        <TeacherPrivateRoute path="/users" component={Users}/>

        <TeacherPrivateRoute path="/tests" component={Tests}/>
        <TeacherPrivateRoute path="/add/test" component={CreateTest}/>
        <TeacherPrivateRoute path="/add/question" component={CreateQuestion}/>
        <TeacherPrivateRoute path="/questions" component={Questions}/>
        <TeacherPrivateRoute path="/homework" component={Homework}/>

        <StudentPrivateRoute path="/student/tests" component={StudentTests}/>
        <StudentPrivateRoute path='/student/dashboard' component={StudentDashboard}/>

        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
  </Provider>
), document.getElementById('root'));
