import React, {Component} from 'react';

import "../../styles/Dashboard/Dashboard.css";

import {addNotification} from "../App/Notification";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',

    };

    this.logout = this.logout.bind(this);
  };


  componentDidMount() {

    fetch('/api/user/' + localStorage.getItem('userId'), {
      method: 'GET',
    })
      .then(res => res.json())
      .then(
        (user) => {
          this.setState({
            user: user
          });
        })
      .then(res => console.log(res))


  };


  logout() {
    localStorage.clear();
    addNotification("Úspěch", "Uživatel odhlášen.", "success");

    this.props.history.push("/");
  }


  render() {
    const {user} = this.state;

    return (
      <div>
        <header className="Dashboard-header">
          Hlavní stránka
          <div className="logged-user">
            Uživatel: {user.username}<br/>
            {user.role}<br/>
          </div>
          <button className="button logout" onClick={this.logout}>Odhlásit se</button>
        </header>


      </div>


    );

  }
}

export default Dashboard;
