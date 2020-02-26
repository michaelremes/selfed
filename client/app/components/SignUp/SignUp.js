import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import logo from './../../../public/assets/img/EduLogo.png';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInUsername: '',
      signInPassword: '',
    };

    this.onTextBoxChangeSignInUsername = this.onTextBoxChangeSignInUsername.bind(this);
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
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
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', {token: json.token});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: json.token,
          });
        } else {
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
              ) : (null)
            }
        <div className="Login">
          <header className="Login-header">
            <img src={logo} className="App-logo" alt="logo"/>
            Vítejte do výukového systému SelfEd
          </header>
          <form>

            <FormGroup controlId="username" bsSize="large">

              <FormControl
                type="username"
                placeholder="Uživatelské jméno"
                value={signInUsername}
                onChange={this.onTextBoxChangeSignInUsername}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">

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
    //successful SignUp

      this.props.history.push('/dashboard');

  }
}

export default SignUp;
