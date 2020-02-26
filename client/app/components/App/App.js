import React, { Component } from 'react';
import "./App.css";
import logo from "../../../public/assets/img/EduLogo.png";

const App = ({ children }) => (
  <>

    <main>

      <div className="sidenav">
        <img src={logo} className="App-logo" alt="logo"/>
        <a href='/dashboard'>Domů</a>
        <a href="/materials">Materiály</a>
        <a href="/tests">Testy</a>
        <a href="/homework">Úkoly</a>
        <a href="/signup">Přidat uživatele</a>
      </div>
      {children}
    </main>

  </>
);

export default App;
