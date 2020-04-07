import logo from "../../../public/assets/img/EduLogo.png";
import React, {Component} from "react";



class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      user_role: '',
    };
  };

  componentDidMount() {
    const user_role = localStorage.getItem('user_role');
    this.setState({
      user_role,
    });

  }


  render() {
    const {
      user_role,
    } = this.state;

    //print different sidebar for a teacher and for a student

    if(user_role === 'teacher'){
      return (
        <div className="sidenav">
          <img src={logo} className="App-logo" alt="logo"/>

          <a href='/dashboard'>Domů</a>
          <a href="/materials">Materiály</a>
          <a href="/add/question">Vytvořit otázku</a>
          <a href="/questions">Všechny otázky</a>
          <a href="/homework">Úkoly</a>
          <a href="/tests">Testy</a>
          <a href="/add/test">Vytvořit test</a>
          <a href="/add/user">Přidat uživatele</a>
          <a href="/users">Uživatelé</a>
        </div>
      );
    }

    else{
      return (
        <div className="sidenav">
          <img src={logo} className="App-logo" alt="logo"/>

          <a href='/dashboard'>Domů</a>
          <a href="/materials">Materiály</a>
          <a href="/homework">Úkoly</a>
        </div>
      );
    }

  }
}

export default SideBar;
