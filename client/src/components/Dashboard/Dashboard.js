import React, {Component} from 'react';

import "../../styles/Dashboard/Dashboard.css";
import logo from "../../../public/assets/img/EduLogo.png";
import {addNotification} from "../App/Notification";



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
    localStorage.clear();
    // usersession should be also deleted
    addNotification("Úspěch", "Uživatel odhlášen.", "success");

    this.props.history.push("/");
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
