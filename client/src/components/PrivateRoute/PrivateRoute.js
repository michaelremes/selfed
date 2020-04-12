import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tests from "../Tests/Tests";
import StudentTests from "../Tests/StudentTests";



//create private route for teachers
export const TeacherPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user_session')
      && localStorage.getItem('user_role') === 'teacher'
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )}
  />
);
export const StudentPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user_session')
      && localStorage.getItem('user_role') === 'student'
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )}
  />
);
