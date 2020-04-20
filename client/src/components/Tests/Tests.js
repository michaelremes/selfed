import React, {Component} from "react";

import '../../styles/Tests/Tests.css';
import MaterialTable from 'material-table';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

//------------------------------------
// add option to view it as pdf
//------------------------------------
class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      columns: [],
      isLoading: false,

    };

    this.deleteTest = this.deleteTest.bind(this);
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

  deleteTest(test){
    fetch('/api/test/' + test._id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
  }

  render() {
    const {
      tests,
      isLoading,
      error
    } = this.state;

    const columns = [
      {title: 'Název testu', field: 'title'},
      {title: 'Datum vytvořeni', field: 'date'},
      {title: 'Aktivni'},
    ];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <header className="Tests-header">
            Seznam testů
          </header>
          <div className="TestList">
            <MaterialTable
              title="Seznam vytvořených testů"
              columns={columns}
              data={tests}
              actions={[
                {
                  icon: PictureAsPdfIcon,
                  tooltip: 'Zobrazit test jako pdf',
                }
              ]}
              editable={{
                onRowDelete: test =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        /*delete test in database */
                        this.deleteTest(test);
                        /*delete test in array so the page doesnt need refresh */
                        let tests = this.state.tests;
                        const index = tests.indexOf(test);
                        tests.splice(index, 1);
                        this.setState({ tests }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  })
              }}
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
                    deleteText: "Odstranit test?",
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
}


export default Tests;
