import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import logo from './../../../public/assets/img/EduLogo.png';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";



class Tests extends Component {


  render() {
   return(
     <header className="Dashboard-header">
       <img src={logo} className="App-logo" alt="logo"/>
       Testy
     </header>
      );
    }
}


export default Tests;
