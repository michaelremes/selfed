import logo from "../../../public/assets/img/EduLogo.png";
import React, {Component} from "react";
import TreeView from "@material-ui/lab/TreeView";


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


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

    if (user_role === 'teacher') {
      return (
        <div className="sidenav">
          <img src={logo} className="App-logo" alt="logo"/>
          <TreeView
            className="TreeViewSideBar"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
          >
            <a href='/dashboard'>Domů</a>
            {/*<a href="/materials">Materiály</a>*/}
            {/*<TreeItem nodeId="1" label="Otázky" >*/}
            {/*  <TreeItem nodeId="2" label="Vytvořit otázku" onClick={() => {*/}
            {/*    history.push('/dashboard');*/}
            {/*  }}/>*/}
            {/*  <TreeItem nodeId="3" label="Seznam otázek" onClick={<Redirect to="/questions" />}/>*/}
            {/*</TreeItem>*/}
            <a href="/add/question">Vytvořit otázku</a>
            <a href="/questions">Všechny otázky</a>
            {/*<a href="/homework">Úkoly</a>*/}
            <a href="/tests">Testy</a>
            <a href="/add/test">Vytvořit test</a>
            <a href="/results">Výsledky</a>
            <a href="/add/user">Přidat uživatele</a>
            <a href="/users">Uživatelé</a>


          </TreeView>


        </div>
      );
    } else {
      return (
        <div className="sidenav">
          <img src={logo} className="App-logo" alt="logo"/>

          <a href='/student/dashboard'>Domů</a>
          <a href='/student/tests'>Testy</a>
          <a href='/student/results'>Výsledky</a>
          {/*<a href='/student/homework'>Úkoly</a>*/}
        </div>
      );
    }

  }
}

export default SideBar;
