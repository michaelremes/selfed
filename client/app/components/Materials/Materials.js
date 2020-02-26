import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {getFromStorage} from '../../utils/storage';

import "../../styles/Dashboard/Dashboard.css";
import logo from "../../../public/assets/img/EduLogo.png";
import Sidebar from "react-sidebar";


class Materials extends Component {

  render() {
      return (
        <header className="Dashboard-header">
          <img src={logo} className="App-logo" alt="logo"/>
          Materiály
        </header>
      );
    }
}

export default Materials;
