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
      testOpen: false

    };
    this.renderTest = this.renderTest.bind(this);
    this.renderListOfTests = this.renderListOfTests.bind(this);

    this.forwardBack = this.forwardBack.bind(this);
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
        return <textarea
          required
          id="task-input"

          // value={task}
          // onChange={this.onTextBoxChangeTextAnswer}
        />;
      case 'checkbox':
        return (
          <FormGroup>

            {question.answers.map((answerLabel, index) => {
              return (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        // onChange={handleChange('checkedB')}
                        value="checked"
                        color="primary"
                      />
                    }
                    label={answerLabel}

                  />

                </div>
              )
            })}


          </FormGroup>
        );

      case 'radio':
        return (
          <div>

            {question.answers.map((answerLabel, index) => {
              return (
                <div className="radio-answer">
                  <RadioGroup value={correctRadioAnswer}>
                    <FormControlLabel
                      control={
                        <Radio
                          value={answer}
                          color="primary"
                        />
                      }

                      // onChange={handleChange}

                      label={answerLabel}

                    />


                  </RadioGroup>
                </div>

              )
            })}


          </div>
        );
    }
  }

  renderTest() {
    return (
      <div>
        <header className="StudentTests-header">
          {this.state.currentTest.title}
          <button className="button logout" onClick={this.forwardBack}>Zpět</button>
        </header>

        {this.state.currentTest.questions.map((question, index) => {
          return (
            <div className="StudentTest">
              <form>
                <h2>Název otázky</h2>
                {question.title}
                <FormGroup controlId="task" size="large">

                  <h2>Zadání v LaTexu</h2>

                  <div className="LatexPreview">
                    <Latex>{question.task}</Latex>
                  </div>
                </FormGroup>

                {this.renderCorrectAnswer(question)}





              </form>
            </div>
          )
        })}


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
