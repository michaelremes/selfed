import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Login/Login.css";
import logo from './../../../public/assets/img/EduLogo.png';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'
import {addNotification} from "../App/Notification";




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInUsername: '',
      signInPassword: '',
    };

    this.onTextBoxChangeSignInUsername = this.onTextBoxChangeSignInUsername.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('user_session');
   // // error obj is null
    if (obj && obj.token) {

      const {token} = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
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

  onTextBoxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }




  onSignIn() {
    // Grab state
    const {
      signInUsername,
      signInPassword,

    } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('user_session', {token: json.token});
          localStorage.setItem('user_id', json.user_id);
          localStorage.setItem('username', signInUsername);
          localStorage.setItem('user_role', json.user_role);


          addNotification("Úspěch", "Úspěšné přihlášení", "success");

          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: json.token,
          });

        }
        else {
          addNotification("Error", "Přihlášení se nepodařilo.", "danger");
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }



  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
    } = this.state;
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : null
            }
        <div className="Login">
          <header className="Login-header">
            <img src={logo} className="App-logo" alt="logo"/>
            Vítejte do výukového systému SelfEd
          </header>
          <form>

            <FormGroup controlId="username" size="large">

              <FormControl
                type="username"
                placeholder="Uživatelské jméno"
                value={signInUsername}
                onChange={this.onTextBoxChangeSignInUsername}
              />
            </FormGroup>
            <FormGroup controlId="password" size="large">

              <FormControl
              type="password"
              placeholder="Heslo"
              value={signInPassword}
              onChange={this.onTextBoxChangeSignInPassword}
            />
            </FormGroup>
            <button onClick={this.onSignIn}>
              Přihlásit se
            </button>
          </form>
        </div>
          </div>
        </div>
      );
    }
    if(localStorage.getItem('user_role') === 'teacher'){
      return <Redirect to="/dashboard" />
    }
    else{
      return <Redirect to="/student/dashboard" />
    }


  }
}

export default Login;
