import React, {useState, Component} from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Users/AddUser.css";
import {addNotification} from '../App/Notification';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";


class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpRole: ''
    };

    this.onTextBoxChangeSignUpUsername = this.onTextBoxChangeSignUpUsername.bind(this);
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);
    this.onTextBoxChangeSignUpRole = this.onTextBoxChangeSignUpRole.bind(this);

    this.onSignUp = this.onSignUp.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
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

  onTextBoxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextBoxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextBoxChangeSignUpRole(event) {
    this.setState({
      signUpRole: event.target.value,
    });
  }

  onSignUp() {
    //grab state
    const {
      signUpUsername,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpRole
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/add/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        firstName: signUpFirstName,
        lastName: signUpLastName,
        role: signUpRole,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Uživatel přidán.", "success");
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpUsername: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpRole: ''
          });
        } else {
          addNotification("Error", "Uživatel nemohl být přidán.", "danger");
          this.setState({
            isLoading: false,
          });
        }
      });
  }


  render() {
    const {
      isLoading,
      token,
      signUpError,
      signUpUsername,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpRole
    } = this.state;
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    return (
      <div>
        <div>
          {
            (signUpError) ? (
              <p>{signUpError}</p>
            ) : null
          }
          <div className="SignUp">
            <header className="Login-header">
              Přidat nového uživatele
            </header>
            <form>
              <FormGroup controlId="textInput" size="large">
                <FormControl
                  type="username"
                  placeholder="Uživatelské jméno"
                  value={signUpUsername}
                  onChange={this.onTextBoxChangeSignUpUsername}
                />

                <FormControl
                  type="password"
                  placeholder="Heslo"
                  value={signUpPassword}
                  onChange={this.onTextBoxChangeSignUpPassword}
                />

                <FormControl
                  type="text"
                  placeholder="Křestní jméno"
                  value={signUpFirstName}
                  onChange={this.onTextBoxChangeSignUpFirstName}
                />


                <FormControl
                  type="text"
                  placeholder="Přijmení"
                  value={signUpLastName}
                  onChange={this.onTextBoxChangeSignUpLastName}
                />

              </FormGroup>

              <h2>Role:</h2>
              <div className="role-select">
                <RadioGroup  value={signUpRole} onChange={this.onTextBoxChangeSignUpRole}>
                  <FormControlLabel value={"teacher"} control={<Radio color="primary" />} label="Učitel" />
                  <FormControlLabel value={"student"} control={<Radio color="primary" />} label="Student" />
                </RadioGroup>
              </div>

              <button id="addUserButton" onClick={this.onSignUp}>
                Přidat nového uživatele
              </button>

            </form>
          </div>
        </div>
      </div>


    );
  }
}

export default AddUser;
