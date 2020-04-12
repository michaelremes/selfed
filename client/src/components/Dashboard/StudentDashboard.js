import React, {Component} from 'react';

import "../../styles/Dashboard/Dashboard.css";

import {addNotification} from "../App/Notification";



class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
        Hlavní stránka
        <button className="button logout" onClick={this.logout}>Odhlásit se</button>
      </header>
      </div>


  );

}
}

export default StudentDashboard;
