import React, {Component} from 'react';

import "../../styles/Dashboard/Dashboard.css";

import {addNotification} from "../App/Notification";
import MaterialTable from "material-table";



class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

    this.logout = this.logout.bind(this);
  };

  componentDidMount() {

    fetch('/api/student/tests')
      .then(res => res.json())
      .then(
        (results) => {
          const studentResults =
            results.filter(arr => arr.userId === localStorage.getItem('user_id'));

          this.setState({
            studentResults: studentResults
          });

        },
        (error) => {
          this.setState({});
        }
      )
  };
  logout() {
    localStorage.clear();
    // usersession should be also deleted
    addNotification("Úspěch", "Uživatel odhlášen.", "success");

    this.props.history.push("/");
  }

  render() {
    const {
      studentResults,
    }=this.state;
    const columns = [
      {title: 'Uživatelské jméno', field: 'username'},
      {title: 'Test', field: 'finishedTest.title'},
      {title: 'Počet bodů', field: 'totalPoints'},
    ];
    return (
      <div>
      <header className="Dashboard-header">
        Hlavní stránka
        <button className="button logout" onClick={this.logout}>Odhlásit se</button>
      </header>
        <div className="StudentResults">
          <MaterialTable
            title="Výsledky z testů"
            columns={columns}
            data={studentResults}

            localization={{
              header: {
                actions: 'Možnosti'
              },
              toolbar: {
                searchPlaceholder: 'Vyhledat',
                searchTooltip: 'Vyhledat'
              },
              pagination: {
                labelRowsSelect: 'Řádek',
                firstTooltip: "První stránka",
                previousTooltip: "Předchozí stránka",
                nextTooltip: "Další stránka",
                lastTooltip: "Poslední stránka"
              },
              body: {
                editRow: {
                  deleteText: "Odstranit uživatele?",
                  cancelTooltip: "Zrušit",
                  saveTooltip: "Potvrdit"
                },
                emptyDataSourceMessage: "Žádná data k zobrazení",
                deleteTooltip: "Odstranit"
              }

            }}
          />
        </div>
      </div>


  );

}
}

export default StudentDashboard;
