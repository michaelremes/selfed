import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {getFromStorage} from '../../utils/storage';

import "../../styles/Dashboard/Dashboard.css";
import logo from "../../../public/assets/img/EduLogo.png";
import Sidebar from "react-sidebar";

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
      <header className="Dashboard-header">
        <img src={logo} className="App-logo" alt="logo"/>
        Hlavní stránka
        <button className="button login" onClick={this.logout}>Odhlásit se</button>
      </header>





  );

}
}

export default Dashboard;
