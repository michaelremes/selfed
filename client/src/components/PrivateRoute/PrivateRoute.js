import React from 'react';
import { Route, Redirect } from 'react-router-dom';




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
//private route for students
export const StudentPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user_session')
      && localStorage.getItem('user_role') === 'student'
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )}
  />
);
