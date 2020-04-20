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

    this.deleteQuestion = this.deleteQuestion.bind(this);
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

  deleteQuestion(question){
    fetch('/api/question/' + question._id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))

  }

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
          <div className="QuestionsList">
            <MaterialTable
              title="Seznam vytvořených otázek"
              columns={columns}
              data={questions}
              editable={{
                onRowDelete: question =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        /*delete user in database */
                        this.deleteQuestion(question);
                        /*delete user in array so the page doesnt need refresh */
                        let questions = this.state.questions;
                        const index = questions.indexOf(question);
                        questions.splice(index, 1);
                        this.setState({ questions }, () => resolve());
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
                    deleteText: "Odstranit otázku?",
                    cancelTooltip: "Zrušit",
                    saveTooltip: "Potvrdit",

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

export default Questions;
