import React, {Component} from "react";

import '../../styles/Tests/Tests.css';
import MaterialTable from 'material-table';



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
}


export default Tests;
