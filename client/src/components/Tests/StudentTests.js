import React, {Component} from "react";

import '../../styles/Tests/StudentTests.css';
import MaterialTable from "material-table";
import Redirect from "react-router/Redirect";
import {addNotification} from "../App/Notification";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import {Button, FormGroup} from "react-bootstrap";
import {TextField} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Latex = require('react-latex');

class StudentTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTests: [],
      currentTest: '',
      finishedTest: '',
      testOpen: false,

      userResultError:''
    };
    this.renderTest = this.renderTest.bind(this);
    this.renderListOfTests = this.renderListOfTests.bind(this);

    this.forwardBack = this.forwardBack.bind(this);
    this.submitTest = this.submitTest.bind(this);

    this.onChangeAnswer = this.onChangeAnswer.bind(this);
  }

  onChangeAnswer(event) {
    let index = event.target.value;
    let array = this.state.finishedTest; // make a separate copy of the array

    if (index !== -1) {
      let answer = {...array[index]};

      answer.selected = true;
      array[index] = answer;

      console.log("Answer selected: " + answer.selected);
    }
    this.setState({finishedTest: array});

  }

  componentDidMount() {

    this.setState({
        userId: localStorage.getItem('userId')
    });
    fetch('/api/tests')
      .then(res => res.json())
      .then(
        (test) => {

          this.setState({
            allTests: test
          });


        },
        (error) => {
          this.setState({});
        }
      )
  };


  forwardBack() {
    this.setState({
      testOpen: false
    });
    this.props.history.push("/student/tests");
  }

  renderCorrectAnswer(question) {
    const {
      answer,
      correctRadioAnswer

    } = this.state;
    switch (question.type) {
      case 'text':
        return (
          <div>
            <h2>Vaše odpověd</h2>
            <textarea
              id="task-input"
              // onChange={this.onTextBoxChangeTextAnswer}
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
                        // checked={state.checkedB}
                        onChange={this.onChangeAnswer}
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

      // case 'radio':
      //   return (
      //     <div>
      //
      //       {question.answers.map((answerLabel, index) => {
      //         return (
      //           <div className="radio-answer">
      //             <RadioGroup value={correctRadioAnswer}>
      //               <FormControlLabel
      //                 control={
      //                   <Radio
      //                     value={answer}
      //                     color="primary"
      //                   />
      //                 }
      //
      //                 // onChange={handleChange}
      //
      //                 label={answerLabel}
      //
      //               />
      //
      //
      //             </RadioGroup>
      //           </div>
      //
      //         )
      //       })}
      //
      //
      //     </div>
      //   );
    }
  }

  submitTest() {

    //grab state
    const {
        userId,
        finishedTests,
        totalPoints
    } = this.state;

    // Post request to backend
    fetch('/api/add/student/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        finishedTests: finishedTests,
        totalPoints: totalPoints
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Test byl odevzdán.", "success");
          this.setState({
            userId: '',
            finishedTests: [],
            totalPoints: '',
            isLoading: false,
          });
        } else {
          addNotification("Error", "Test nomhl být vytvořen.", "danger");
          this.setState({
            userResultError: json.message,
            isLoading: false
          });
        }
      });


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


              </form>

            </div>
          )
        })}
        <div>

          <button id="submitTestButton" onClick={this.submitTest}>
            Odevzdat test
          </button>
        </div>

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
                      currentTest: test,
                      finishedTest: test
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
