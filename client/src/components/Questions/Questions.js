import React, {Component} from "react";

import '../../styles/Questions/Questions.css';
import MaterialTable from 'material-table';
import {FormGroup} from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Latex = require('react-latex');
// lists existing questions
class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      columns: [],
      isLoading: false,
      questionOpen: false,
      currentQuestion: '',

    };

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.renderQuestionList = this.renderQuestionList.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.forwardBack = this.forwardBack.bind(this);
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
  forwardBack() {
    this.setState({
      questionOpen: false
    });
    this.props.history.push("/questions");
  }
  deleteQuestion(question) {
    fetch('/api/question/' + question._id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))

  }

  renderQuestionList() {
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
              actions={[
                {
                  icon: 'visibility',
                  tooltip: 'Zobrazit test',

                  onClick: (event, question) => {
                    this.setState(
                      {
                        questionOpen: true,
                        currentQuestion: question
                      }
                    );
                  }
                }
              ]}
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
                        this.setState({questions}, () => resolve());
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

  renderQuestion(){
    const {
      currentQuestion

    } = this.state;
    return (
      <div id="mainTestForm">
        <header className="StudentTests-header">
          {currentQuestion.title}
          <button className="button logout" onClick={this.forwardBack}>Zpět</button>
        </header>
        <div className="StudentTest"
        >
          <form>
            <h1>{currentQuestion.title}</h1>

            <FormGroup controlId="task" size="large">

              <h2>Zadání</h2>

              <div className="LatexPreview">
                <Latex>{currentQuestion.task}</Latex>
              </div>
            </FormGroup>

            {this.renderCorrectAnswer(currentQuestion)}
          </form>

        </div>



      </div>

    );
  }
  renderCorrectAnswer(question) {
    switch (question.type) {
      case 'text':
        return (
          <div>
            <h2>Vaše odpověd</h2>
            <textarea
              id="task-input"
              // value={question.te}
            />
          </div>
        );

      case 'checkbox':
        return (
          <FormGroup id="checkbox-answers">
            {question.answers.map((answer, index) => {
              return (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={answer.correct}
                        color="primary"
                      />
                    }
                    label={<Latex>{answer.label}</Latex>}
                  />

                </div>
              )
            })}

          </FormGroup>
        );

      case 'radio':
        return (
          <FormGroup id="radio-answers">
            <RadioGroup>
              {question.answers.map((answer, index) => {
                return (
                  <div>
                    <FormControlLabel
                      control={
                        <Radio
                          color="primary"
                          checked={answer.correct}
                        />
                      }
                      label={<Latex>{answer.label}</Latex>}
                    />

                  </div>

                )
              })}

            </RadioGroup>
          </FormGroup>
        );
    }
  }

  render() {
    const {
      questionOpen
    } = this.state;
      return(
        <div>
          {
            questionOpen ? this.renderQuestion() : this.renderQuestionList()
          }

        </div>
      )

  }

}

export default Questions;
