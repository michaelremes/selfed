import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {getFromStorage} from '../../utils/storage';

import "../../styles/Materials/Materials.css";
import logo from "../../../public/assets/img/EduLogo.png";
import Sidebar from "react-sidebar";


class Materials extends Component {

  render() {
    return (
      <div className="Materials">
        <header className="Dashboard-header">
          Materiály
        </header>
        <div className="Lectures">
        <button
          type="button"
          className="block">
          Kinematika
        </button>
        <button
          type="button"
          className="block">
          Přidat lekci
        </button>
      </div>
      </div>
    );
  }
}

export default Materials;
