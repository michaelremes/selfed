import React, {Component} from "react";
import '../../styles/Tests/CreateTest.css';
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Questions from "../Questions/Questions";

import MaterialTable from "material-table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {addNotification} from "../App/Notification";

class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTestError: '',
      title: '',
      questions: [],
      testQuestions: [],
      question: '',
      isLoading: true,
    };


    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onNumberBoxChangePoints = this.onNumberBoxChangePoints.bind(this);
    this.onCreateTest = this.onCreateTest.bind(this);


    this.addQuestion = this.addQuestion.bind(this);


  }

  onTextBoxChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  onNumberBoxChangePoints(event, index) {

    let array = [...this.state.testQuestions]; // make a separate copy of the array

    if (index !== -1) {
      let question = {...array[index]};
      question.points = event.target.value;
      array[index] = question;
    }
    this.setState({testQuestions: array});

  }


  addQuestion(question) {
      this.setState(previousState => ({
        testQuestions: [...previousState.testQuestions, question],
      }));
  }

  removeQuestion(index) {
    let array = [...this.state.testQuestions]; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({testQuestions: array});
    }
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


  onCreateTest(){

    //grab state
    const {
      title,
      testQuestions
    } = this.state;
    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/add/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        questions: testQuestions
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Test byl vytvořen.", "success");
          this.setState({
            createTestError: json.message,
            title: '',
            testQuestions: [],
            isLoading: false,
          });
        } else {
          addNotification("Error", "Test nomhl být vytvořen.", "danger");
          this.setState({
            createTestError: json.message,
            isLoading: false
          });
        }
      });

  }


  render() {
    const {
      title,
      questions,
      question,
      selectedDate,
      tests,
      isLoading,
      error,
      questionPoints
    } = this.state;

    const columns = [
      {title: 'Název', field: 'title'},
      {title: 'Zadání', field: 'task'},
      {title: 'Typ', field: 'type'},
    ];

    return (

      <div>
        <header className="CreateTest-header">
          Vytvořit test
        </header>
        <div className="CreateTest">
          <form>
            <h2>Název testu</h2>
            <FormGroup controlId="task" size="large">
              <TextField
                required
                id="title-required"
                label="Nutno vyplnit"
                variant="filled"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Přidat otázky</h2>

            </FormGroup>

              <MaterialTable
                title="Seznam vytvořených otázek"
                columns={columns}
                data={questions}
                actions={[
                  {
                    icon: 'add',
                    tooltip: 'Přidat otázku do testu',
                    onClick: (event, question) => {
                      this.addQuestion(question);

                    },
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
                  },
                  body: {
                    emptyDataSourceMessage: "Žádná data k zobrazení"
                  }
                }}

              />
            <FormGroup>

              {this.state.testQuestions.map((question, index) => {

                return (
                  <div className="QuestionList">

                    {question.title}
                    <IconButton aria-label="delete" className="delete-answer"
                                 onClick={this.removeQuestion.bind(this, index)}
                    >
                      <DeleteIcon/> Odstranit otázku
                    </IconButton>

                    <TextField
                      id="points-for-test"
                      label="Počet bodů za otázku"
                      type="number"
                      variant="outlined"
                      value={question.points || ''}
                      onChange={(event) => {this.onNumberBoxChangePoints(event, index)}}
                    />
                  </div>

                )
              })}

            </FormGroup>
            <button id="createTestButton" onClick={this.onCreateTest}>
              Vytvořit test
            </button>

          </form>
        </div>

      </div>
    );
  }
}


export default CreateTest;
