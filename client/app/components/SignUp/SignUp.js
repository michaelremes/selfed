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
      signUpUsername: '',
      signUpPassword: '',
    };

    this.onTextBoxChangeSignUpUsername = this.onTextBoxChangeSignUpUsername.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);

  }


  onTextBoxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }


  render() {
    return(
      <header className="Dashboard-header">
        <img src={logo} className="App-logo" alt="logo"/>
        Vytvořit nového uživatele
      </header>
    );
      }
}

export default SignUp;
