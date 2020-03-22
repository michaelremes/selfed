import logo from "../../../public/assets/img/EduLogo.png";
import React from "react";

const SideBar = () => (
  <div className="sidenav">
    <img src={logo} className="App-logo" alt="logo"/>
    <a href='/dashboard'>Domů</a>
    <a href="/materials">Materiály</a>
    <a href="/add/question">Vytvořit otázku</a>
    <a href="/questions">Všechny otázky</a>
    <a href="/homework">Úkoly</a>
    <a href="/tests">Testy</a>
    <a href="/add/test">Vytvořit test</a>
    <a href="/signup">Přidat uživatele</a>
    <a href="/users">Uživatelé</a>
  </div>

);
export default SideBar;
