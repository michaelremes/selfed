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
                  tooltip: 'Zobrazit test',
                },
                {
                  icon: 'delete',
                  tooltip: 'Smazat test',
                  onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
                }

              ]}
              localization={{
                header: {
                  actions: 'Možnosti'
                },
                toolbar: {
                  searchPlaceholder: 'Vyhledat'
                },
                pagination: {
                  labelRowsSelect: 'Řádek',
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
