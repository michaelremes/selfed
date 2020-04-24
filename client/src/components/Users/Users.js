import React, {Component} from "react";


import '../../styles/Users/Users.css';
import MaterialTable from 'material-table';
import {getFromStorage} from "../../utils/storage";


//lists existing users
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
      isLoading: false,
      loggedUserRole: ''
    };

  this.deleteUser = this.deleteUser.bind(this);
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


  deleteUser(user){
    fetch('/api/user/' + user._id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
  }

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
                onRowDelete: user =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        /*delete user in database */
                        this.deleteUser(user);
                        /*delete user in array so the page doesnt need refresh */
                        let users = this.state.users;
                        const index = users.indexOf(user);
                        users.splice(index, 1);
                        this.setState({ users }, () => resolve());
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

}

export default Users;
