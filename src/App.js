import React from 'react';
import logo from './EduLogo.png';
import './App.css';
import Login from "./login/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Vítejte do výukového systemu SelfEd
      </header>

        <Login />

    </div>
  );


}

export default App;
