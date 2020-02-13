import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom"

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import {AuthProvider} from "./components/Auth/Auth";

function App() {
  return (
      <AuthProvider>
        <Router>
            <div>
                <Route exact path = "/" component={Dashboard} />
                <Route exact path = "/" component={Login} />
            </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
