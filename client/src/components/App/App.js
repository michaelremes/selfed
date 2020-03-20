import React, { Component } from 'react';
import "../../styles/App/App.css";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = ({ children }) => (
  <div className="app-container">
    <ReactNotification />
    <main>
      {children}
    </main>

  </div>
);

export default App;
