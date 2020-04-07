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

class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      open: false,
      setOpen: false,
      questions: [],
      testQuestions: [],
      question: '',

    };


    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onCreateTest = this.onCreateTest.bind(this);


    this.addQuestion = this.addQuestion.bind(this);


  }

  onTextBoxChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  addQuestion(question) {
      this.setState(previousState => ({
        testQuestions: [...previousState.testQuestions, question],
      }));
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

  }


  render() {
    const {
      title,
      questions,
      question,
      selectedDate,
      tests,
      isLoading,
      error
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
                id="filled-required"
                label="Nutno vyplnit"
                variant="filled"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Přidat otázky</h2>

            </FormGroup>

            <div className="QuestionList">

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

              />
            </div>

            <FormGroup>

              {this.state.testQuestions.map((question, index) => {

                return (
                  <div>
                    {console.log(this.state.testQuestions.length)}
                    {question.title}
                    <IconButton aria-label="delete" className="delete-answer"
                                // onClick={this.removeItemCheckBox.bind(this, index)}
                    >
                      <DeleteIcon/> Smazat
                    </IconButton>
                  </div>

                )
              })}

            </FormGroup>
            <button onClick={this.onCreateTest}>
              Vytvořit test
            </button>

          </form>
        </div>

      </div>
    );
  }
}


export default CreateTest;
