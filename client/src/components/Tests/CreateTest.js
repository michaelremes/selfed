import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import logo from './../../../public/assets/img/EduLogo.png';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import MaterialTable from "material-table";


class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      columns: [],
      isLoading: false,

    };
  }

  componentDidMount() {
    fetch('/api/tests')
      .then(res => res.json())
      .then(
        (test) => {
          this.setState({
            isLoading: true,
            tests: test
          });
        },
        (error) => {
          this.setState({
            isLoading: true,
            error
          });
        }
      )
  };

  render() {
    const {
      tests,
      isLoading,
      error
    } = this.state;

    const columns = [
      {title: 'Název testu', field: 'title'},
      {title: 'Datum vytvořeni', field: 'date'},
    ];
    return (
      <div>
        <header className="Test-header">
          Testy
        </header>
        <div className="TestList">
          <MaterialTable
            title="Seznam vytvořených otázek"
            columns={columns}
            data={questions}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return {...prevState, data};
                      });
                    }
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return {...prevState, data};
                    });
                  }, 600);
                }),
            }}
          />
        </div>
      </div>
    );
  }
}


export default Tests;
