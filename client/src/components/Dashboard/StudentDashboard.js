import React, {Component} from 'react';

import "../../styles/Dashboard/StudentDashboard.css";

import {addNotification} from "../App/Notification";
import LinearProgress from "@material-ui/core/LinearProgress";



class StudentDashboard extends Component {
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
      },
        (error) => {
          this.setState({
            isLoading: true,
            error
          });
        }
        )
  };



  logout() {
    localStorage.clear();
    addNotification("Úspěch", "Uživatel odhlášen.", "success");

    this.props.history.push("/");
  }

  render() {
    const {
      user
    } = this.state;


    return (

      <div>
        <header className="Dashboard-header">
          Hlavní stránka

          <div className="logged-user">
            Uživatel: {user.username}<br/>
            {user.firstName} {user.lastName}<br/>
            {user.role}<br/>
          </div>
          <button className="button logout" onClick={this.logout}>Odhlásit se</button>
        </header>

        <form>
        <div className='points'>
          Celkem získanych bodů: {user.totalPoints}
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={user.totalPoints ? user.totalPoints : 0}
          />
        </div>
        </form>
      </div>


    );

  }
}

export default StudentDashboard;
