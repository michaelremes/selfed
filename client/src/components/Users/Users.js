import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/SignUp/SignUp.css";
import logo from './../../../public/assets/img/EduLogo.png';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'

//lists existing users
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };


  }

  render() {

    return (
      <div>

      </div>


    );
  }
}

export default Users;
