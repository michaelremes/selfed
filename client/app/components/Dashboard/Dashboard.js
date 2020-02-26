import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {getFromStorage} from '../../utils/storage';

import "../../styles/Dashboard/Dashboard.css";
import logo from "../../../public/assets/img/EduLogo.png";
import Sidebar from "react-sidebar";

const routes = [
  {
    path: '/dashboard',
    exact: true,
    sidebar: () => <div>Home</div>,
    main: () => <h2>Home</h2>
  }
  ,
  {
    path: '/tests',
    sidebar: () => <div>Tests</div>,
    main: () => <h2>Test</h2>
  },
  {
    path: '/materials',
    sidebar: () => <div>Materials</div>,
    main: () => <h2>Materials</h2>
  },
]

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
    };

    this.logout = this.logout.bind(this);
  };


  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const {token} = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <div>
      <header className="Dashboard-header">
        <img src={logo} className="App-logo" alt="logo"/>
        Hlavní stránka
        <button className="button logout" onClick={this.logout}>Odhlásit se</button>
      </header>
      </div>


  );

}
}

export default Dashboard;
