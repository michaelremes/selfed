import React, {Component} from "react";

import '../../styles/Tests/Tests.css';
import MaterialTable from 'material-table';

import {FormGroup} from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Latex = require('react-latex');


class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      columns: [],
      isLoading: false,
      testOpen: false,
      currentTest: '',

    };

    this.deleteTest = this.deleteTest.bind(this);
    this.renderTest = this.renderTest.bind(this);
    this.renderListOfTests = this.renderListOfTests.bind(this);

    this.forwardBack = this.forwardBack.bind(this);
    this.renderCorrectAnswer = this.renderCorrectAnswer.bind(this);
  }


  forwardBack() {
    this.setState({
      testOpen: false
    });
    this.props.history.push("/tests");
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

  renderListOfTests(){
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
                  icon: 'visibility',
                  tooltip: 'Zobrazit test',

                  onClick: (event, test) => {
                    this.setState(
                      {
                        testOpen: true,
                        currentTest: test
                      }
                    );
                  }
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

  renderTest() {
    return (
      <div id="mainTestForm">
        <header className="StudentTests-header">
          {this.state.currentTest.title}
          <button className="button logout" onClick={this.forwardBack}>Zpět</button>
        </header>

        {this.state.currentTest.questions.map((question, index) => {
          return (
            <div className="StudentTest"
            >
              <form>
                <h1>{question.title}</h1>

                <FormGroup controlId="task" size="large">

                  <h2>Zadání</h2>

                  <div className="LatexPreview">
                    <Latex>{question.task}</Latex>
                  </div>
                </FormGroup>

                {this.renderCorrectAnswer(question)}

                <h2> Počet bodů: {question.points}</h2>
              </form>

            </div>
          )
        })}


      </div>

    )
  }






  render() {
    const {
      testOpen
    } = this.state;

    /*render list of tests, if one test is selected, rerender the page and show test */
    return (
      <div>
        {
          testOpen ? this.renderTest() : this.renderListOfTests()
        }
      </div>
    );

  }
}


export default Tests;
