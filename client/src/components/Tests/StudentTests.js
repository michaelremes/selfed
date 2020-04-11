import React, {Component} from "react";

import '../../styles/Tests/StudentTests.css';
import MaterialTable from "material-table";
import Redirect from "react-router/Redirect";



class StudentTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTests: []

    };

  }

  componentDidMount() {
    fetch('/api/tests')
      .then(res => res.json())
      .then(
        (test) => {

            this.setState({
                allTests: test
            });


        },
        (error) => {
          this.setState({

          });
        }
      )
  };

  render() {
    const {
      allTests
    } = this.state;
    const columns = [
      {title: 'Název testu', field: 'title'},
      {title: 'Deadline odevzdání', field: 'date'},
    ];

    /* filter all tests to get only active tests to show to student */
    const activeTests = allTests.filter(arr => arr.active);

      return (
        <div>
          <header className="StudentTests-header">
            Seznam testů
          </header>
          <div className="TestList">
            <MaterialTable
              title="Seznam aktivních testů"
              columns={columns}
              data={activeTests}
              actions={[
                {
                  icon: 'send',
                  tooltip: 'Spustit test',

                  onClick: (event, test) =>  {this.props.history.push('/dashboard')}

                }
              ]}
              localization={{
                header: {
                  actions: 'Akce'
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


export default StudentTests;
