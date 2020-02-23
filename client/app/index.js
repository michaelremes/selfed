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

render((

  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
