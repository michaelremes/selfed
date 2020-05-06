import React, {Component} from "react";

import '../../styles/Tests/StudentTests.css';
import MaterialTable from "material-table";
import {addNotification} from "../App/Notification";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {FormGroup} from "react-bootstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Latex = require('react-latex');

class StudentTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTests: [],
      currentTest: '',
      testOpen: false,
      userResultError: '',
      username: '',
      textAnswer: '',
      totalPoints: 0,
      sumPoints: 0,
      user: '',
    };

    this.renderTest = this.renderTest.bind(this);
    this.renderListOfTests = this.renderListOfTests.bind(this);

    this.forwardBack = this.forwardBack.bind(this);
    this.submitTest = this.submitTest.bind(this);
    this.evaluateTotalPoints = this.evaluateTotalPoints.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.addTextAnswer = this.addTextAnswer.bind(this);
  }

  onChangeAnswer(event, question) {
    let index = event.target.value;

    if (question.type === 'radio') {
      question.answers.map((answer) => {
        answer.selected = false;
      });
    }

    if (index !== -1) {
      let answer = {...question.answers[index]};
      answer.selected = event.target.checked;
      question.answers[index] = answer;

    }
  }

  componentDidMount() {

    this.setState({
      username: localStorage.getItem('username')
    });
    fetch('/api/tests')
      .then(res => res.json())
      .then(
        (tests) => {
          const examTests =
            tests.filter(arr => arr.type === 'test');

          this.setState({
            allTests: examTests
          });


        },
        (error) => {
          this.setState({});
        }
      );
    fetch('/api/user/' + localStorage.getItem('userId'), {
      method: 'GET',
    })
      .then(res => res.json())
      .then(
        (user) => {
          this.setState({
            user: user
          });
        })
      .then(res => console.log(res))

  };


  addTextAnswer(event, question) {

    question.answers[0] = event.target.value;


  }

  evaluateTotalPoints() {
    let points = 0;
    let pointsSummary = 0;

    this.state.currentTest.questions.map((question, index) => {
        question.answers.map((answer, index) => {

          switch (question.type) {
            case 'checkbox':
              if ((answer.selected && answer.correct) || (!answer.selected && !answer.correct)) {
                points += (question.points / question.answers.length);
              }

              break;
            case 'radio':
              if (answer.selected && answer.correct) {
                points += question.points;
              }
              break;
          }


        });
        /* save earned points for question */
        question.earnedPoints = points.toFixed(2);
        pointsSummary += points;

        points = 0;
      }
    );

    this.setState({
      totalPoints: pointsSummary.toFixed(2)
    }, () => {
      this.submitTest()
    });

  }

  forwardBack() {
    this.setState({
      testOpen: false
    });
    this.props.history.push("/student/tests");
  }

  renderCorrectAnswer(question) {
    switch (question.type) {
      case 'text':
        return (
          <div>
            <h2>Vaše odpověd</h2>
            <textarea
              id="task-input"
              onChange={(event) => this.addTextAnswer(event, question)}
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
                        onChange={(event) => this.onChangeAnswer(event, question)}
                        value={index}
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
                          onChange={(event) => this.onChangeAnswer(event, question)}
                          color="primary"
                          value={index.toString()}
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

  submitTest() {

    const {
      username,
      currentTest,
      totalPoints,
      user,
    } = this.state;


    fetch('/api/user/update/' + user._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        totalPoints: parseFloat(totalPoints) + user.totalPoints
      }),
    }).then(res => res.json());


    // Post request to backend
    fetch('/api/add/student/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        finishedTest: currentTest,
        totalPoints: totalPoints
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Test byl odevzdán.", "success");
          this.setState({
            currentTest: '',
            totalPoints: 0,
            isLoading: false,
          });
        } else {
          addNotification("Error", "Test se nepodařilo odevzdat.", "danger");
          this.setState({
            userResultError: json.message,
            isLoading: false
          });
        }
      });


    this.forwardBack();

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

        <button id="submitTestButton" onClick={this.evaluateTotalPoints}>
          Odevzdat test
        </button>
      </div>

    )
  }

  renderListOfTests() {
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
            localization={{
              header: {
                actions: 'Akce'
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
          this.state.testOpen ? this.renderTest() : this.renderListOfTests()
        }
      </div>
    );

  }

}

export default StudentTests;
