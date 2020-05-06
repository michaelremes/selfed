import logo from "../../../public/assets/img/EduLogo.png";
import React, {Component} from "react";
import TreeView from "@material-ui/lab/TreeView";
import "../../styles/SideBar/SideBar.css";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from "@material-ui/lab/TreeItem";



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

            <TreeItem nodeId='1' id="treeItem" label="Vytvořit">
              <a href="/add/question">Otázku</a>
              <a href="/add/test">Test</a>
              {/*<a href="/add/material">Materiály</a>*/}
            </TreeItem>

            <TreeItem nodeId='2' id="treeItem" label="Zobrazit" >
              <a href="/questions">Otázky</a>
              <a href="/tests">Testy</a>
            </TreeItem>

            <TreeItem nodeId='3' id="treeItem" label="Uživatelé">
              <a href="/results">Výsledky</a>
              <a href="/add/user">Přidat uživatele</a>
              <a href="/users">Uživatelé</a>
            </TreeItem>


          </TreeView>


        </div>
      );
    } else {
      return (
        <div className="sidenav">
          <img src={logo} className="App-logo" alt="logo"/>
          <TreeView
            className="TreeViewSideBar"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}

          >
          <a href='/student/dashboard'>Domů</a>
          <TreeItem nodeId='1' id="treeItemStudent" label="Testy">
            <a href="/student/tests">Bodované testy</a>
            {/*<a href="/student/exercise">Procvičovací testy</a>*/}
            {/*<a href="/student/homework">Domácí úkoly</a>*/}
          </TreeItem>
          {/*<a href='/student/materials'>Materiály</a>*/}
          <a href='/student/results'>Výsledky</a>


          </TreeView>
        </div>
      );
    }

  }
}

export default SideBar;
