import React from 'react';
import {render} from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import App from './components/App/App';
import Login from './components/Login/Login';
import NotFound from './components/App/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import AddUser from './components/Users/AddUser';
import Users from './components/Users/Users';
import Tests from './components/Tests/Tests';
import CreateTest from './components/Tests/CreateTest';
import Questions from './components/Questions/Questions';
import CreateQuestion from './components/Questions/CreateQuestion';
import StudentTests from "./components/Tests/StudentTests";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import SideBar from './components/SideBar/SideBar';
import UserResults from './components/Tests/UserResults'
import {TeacherPrivateRoute, StudentPrivateRoute} from './components/PrivateRoute/PrivateRoute';
import CreateMaterial from "./components/Materials/CreateMaterial";
import Materials from "./components/Materials/Materials";
import Files from "./components/Materials/Files";




const sitesAfterLogin = [
  '/dashboard',
  '/add/user',
  '/users',
  '/materials',
  '/tests',
  '/results',
  '/add/test',
  '/add/question',
  '/add/material',
  '/questions',
  '/student/tests',
  '/student/dashboard',
  '/student/results',
  '/student/materials',
  '/student/files',
];



render((
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
        <TeacherPrivateRoute path="/add/material" component={CreateMaterial}/>
        <TeacherPrivateRoute path="/questions" component={Questions}/>
        <TeacherPrivateRoute path="/results" component={UserResults}/>

        <StudentPrivateRoute path="/student/tests" component={StudentTests}/>
        <StudentPrivateRoute path='/student/dashboard' component={StudentDashboard}/>
        <StudentPrivateRoute path='/student/results' component={UserResults}/>
        <StudentPrivateRoute path='/student/materials' component={Materials}/>
        <StudentPrivateRoute path='/student/files' component={Files}/>

        <Route component={NotFound}/>
      </Switch>

    </App>
  </Router>
), document.getElementById('root'));
