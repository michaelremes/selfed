import React, {Component} from "react";

import '../../styles/Tests/UserResults.css';
import MaterialTable from "material-table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {FormGroup} from "react-bootstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Latex = require('react-latex');

class UserResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentResults: [],
      currentResult: '',
      resultOpen: false,
      userResultError: '',
      username: '',
      totalPoints: 0,
    };

    this.renderTest = this.renderTest.bind(this);
    this.renderListOfTests = this.renderListOfTests.bind(this);

    this.forwardBack = this.forwardBack.bind(this);


  }


  componentDidMount() {

    this.setState({
      username: localStorage.getItem('username')
    });
    fetch('/api/student/tests')
      .then(res => res.json())
      .then(
        (results) => {
          if (localStorage.getItem('user_role') === 'teacher') {
            this.setState({
              studentResults: results
            });
          } else {
            const studentResults =
              results.filter(arr => arr.username === localStorage.getItem('username'));

            this.setState({
              studentResults: studentResults
            });
          }


        },
        (error) => {
          this.setState({});
        }
      )
  };


  forwardBack() {
    this.setState({
      resultOpen: false
    });
    if (localStorage.getItem('user_role') === 'teacher') {
      this.props.history.push("/results");
    } else {
      this.props.history.push("/student/results");
    }

  }

  renderCorrectAnswer(question) {

    switch (question.type) {
      case 'text':
        return (
          <div>
            <h2>Vaše odpověd</h2>
            <textarea
              id="task-input"
              value={question.answers[0]}
            />
            <h2>Spárvná odpověď</h2>
            <textarea
              id="task-input"
              value={question.textAnswer}
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
                        checked={answer.selected}
                        color="primary"
                      />
                    }
                    label={<Latex>{answer.label}</Latex>}

                  />

                  <br/>
                  <Latex>
                    {answer.correct ? 'Správná odpověď: ' + answer.label : ''}
                  </Latex>
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
                          checked={answer.selected}
                        />
                      }


                      label={<Latex>{answer.label}</Latex>}

                    />
                    <br/>
                    <Latex>
                      {answer.correct ? 'Správná odpověď byla: ' + answer.label : ''}
                    </Latex>
                  </div>
                )
              })}

            </RadioGroup>
          </FormGroup>
        );
    }
  }


  renderTest() {
    return (
      <div id="mainTestForm">
        <header className="StudentTests-header">
          {this.state.currentResult.finishedTest.title}
          <button className="button logout" onClick={this.forwardBack}>Zpět</button>
        </header>

        {this.state.currentResult.finishedTest.questions.map((question, index) => {
          return (
            <div className="UserResult">

              <form style={{border: 'solid 16px ' + (() => {
                  switch (true) {
                    case (question.earnedPoints < 0.5):
                      return "red";
                    case  (question.earnedPoints > question.points-0.5):
                      return "lawngreen";
                    default:
                      return "gold";
                  }
                })()}}>
                <h1>{question.title}</h1>

                <FormGroup controlId="task" size="large">

                  <h2>Zadání</h2>
                  <h3> Otázka za {question.points}b</h3>
                  <div className="LatexPreview">
                    <Latex>{question.task}</Latex>
                  </div>
                </FormGroup>

                {this.renderCorrectAnswer(question)}


                <h2>Získáno {question.earnedPoints}b</h2>

              </form>


            </div>
          )
        })}
        <div className="summary">
          <h2>Celkem {this.state.currentResult.totalPoints}b</h2>
        </div>
      </div>

    )
  }

  renderListOfTests() {
    const {
      studentResults
    } = this.state;

    const columns = [
      {title: 'Uživatelské jméno', field: 'username'},
      {title: 'Test', field: 'finishedTest.title'},
      {title: 'Datum', field: 'date'},
      {title: 'Počet získaných bodů', field: 'totalPoints'},
    ];

    return (
      <div>
        <header className="StudentTests-header">
          Výsledky
        </header>
        <div className="TestList">
          <MaterialTable
            title="Seznam aktivních testů"
            columns={columns}
            data={studentResults}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Zobrazit test',

                onClick: (event, result) => {
                  this.setState(
                    {
                      resultOpen: true,
                      currentResult: result
                    }
                  );
                }
              }
            ]}
            localization={{
              header: {
                actions: 'Zobrazit'
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
                emptyDataSourceMessage: "Žádná data k zobrazení",
              }
            }}
          />
        </div>
      </div>
    );
  }

  render() {

    /*render list of tests, if one test is selected, rerender the page and show test */
    return (
      <div>
        {
          this.state.resultOpen ? this.renderTest() : this.renderListOfTests()
        }
      </div>
    );

  }

}

export default UserResults;
