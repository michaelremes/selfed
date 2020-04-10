import React, {Component} from "react";

import '../../styles/Questions/Questions.css';
import MaterialTable from 'material-table';


// lists existing questions
class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      columns: [],
      isLoading: false,

    };
  }

  componentDidMount() {
    fetch('/api/questions')
      .then(res => res.json())
      .then(
        (question) => {
          this.setState({
            isLoading: true,
            questions: question
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
      questions,
      isLoading,
      error
    } = this.state;

    const columns = [
      {title: 'Název', field: 'title'},
      {title: 'Zadání', field: 'task'},
      {title: 'Typ', field: 'type'},
    ];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoading) {
      return <div>Loading...</div>;
    } else {

      return (
        <div>
          <header className="Questions-header">
            Vytvořené otázky
          </header>
          <div className="QuestionList">

            <MaterialTable
              title="Seznam vytvořených otázek"
              columns={columns}
              data={questions}
              actions={[
              {
                icon: 'edit',
                tooltip: 'Upravit Otázku',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              },
              {
                icon: 'visibility',
                tooltip: 'Zobrazit otázku',

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

export default Questions;
