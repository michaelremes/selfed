import React, {Component} from "react";


import '../../styles/Users/Users.css';
import MaterialTable from 'material-table';


//lists existing users
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
      isLoading: false,
    };


  }
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(
        (user) => {
          this.setState({
            isLoading: true,
            users: user
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
      users,
      isLoading,
      error
    } = this.state;

    const columns = [
      {title: 'Uživatelské jméno', field: 'username'},
      {title: 'Křestní jméno', field: 'firstName'},
      {title: 'Příjmení', field: 'lastName'},
      {title: 'Role', field: 'role'},
    ];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoading) {
      return <div>Loading...</div>;
    } else {

      return (
        <div>
          <header className="Users-header">
            Seznam uživatelů
          </header>
          <div className="UsersList">

            <MaterialTable
              title="Seznam vytvořených otázek"
              columns={columns}
              data={users}
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

export default Users;
