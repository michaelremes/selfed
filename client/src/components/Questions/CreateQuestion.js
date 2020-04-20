import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Questions/CreateQuestion.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AddIcon from '@material-ui/icons/Add';
import {addNotification} from "../App/Notification";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Input from "@material-ui/core/Input";

const Latex = require('react-latex');

class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createQuestionError: '',
      title: '',
      task: '',
      type: 'checkbox',
      answer: {
        label: '',
        correct: false,
        points: '',
        selected: false
      },

      answers: [],
      radioBoxAnswers: [],
      correctRadioAnswer: '',
      correctAnswer: false
    };

    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onTextBoxChangeTask = this.onTextBoxChangeTask.bind(this);
    this.onTextBoxChangeAnswer = this.onTextBoxChangeAnswer.bind(this);

    this.onSelectQuestionType = this.onSelectQuestionType.bind(this);
    this.onCreateQuestion = this.onCreateQuestion.bind(this);

    this.addItemCheckBox = this.addItemCheckBox.bind(this);
    this.removeItemCheckBox = this.removeItemCheckBox.bind(this);

    this.addItemRadioBox = this.addItemRadioBox.bind(this);
    this.removeItemRadioBox = this.removeItemRadioBox.bind(this);

    this.onChangeCorrectAnswer = this.onChangeCorrectAnswer.bind(this);

  }

  onTextBoxChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onTextBoxChangeTask(event) {
    this.setState({
      task: event.target.value,
    });
  }

  onSelectQuestionType(event) {
    this.setState({
      type: event.target.value,
    });
  }

  onTextBoxChangeAnswer(event) {
    this.setState({
      answer: {label: event.target.value},
    });
  }

  onChangeCorrectAnswer(event) {

    let index = event.target.value;
    let array = [...this.state.answers]; // make a separate copy of the array

    if (index !== -1) {
      let answer = {...array[index]};

      answer.correct = event.target.checked;
      array[index] = answer;
    }
    this.setState({answers: array});

  }

  addItemCheckBox() {
    this.setState(previousState => ({
      answers: [...previousState.answers, this.state.answer],
      answer: {label: '', correct: false},
    }));
  }


  removeItemCheckBox(index) {
    let array = [...this.state.answers]; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({answers: array});
    }
  }

  addItemRadioBox() {
    this.setState(previousState => ({
      radioBoxAnswers: [...previousState.radioBoxAnswers, this.state.answer],
      answer: ''
    }));
  }

  removeItemRadioBox(index) {
    let array = [...this.state.radioBoxAnswers]; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({radioBoxAnswers: array});
    }
  }


  onCreateQuestion() {

    const {
      title,
      task,
      type,
      answers,
      radioBoxAnswers
    } = this.state;

    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/add/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        task: task,
        type: type,
        answers: answers,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          addNotification("Úspěch", "Otázka úspěšně vytvořena.", "success");
          this.setState({
            createQuestionError: json.message,
            title: '',
            task: '',
            type: '',
            answers: [],
          });
        } else {
          addNotification("Error", "Otázka nemohla být vytvořena.", "danger");
          this.setState({
            createQuestionError: json.message,
            isLoading: false
          });
        }
      });
  }

  renderCorrectAnswer(param) {
    const {
      answer,
      correctRadioAnswer,
      correctAnswer

    } = this.state;
    switch (param) {
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
            <h3>(Zaškrtněte správné odpovědi)</h3>
            {this.state.answers.map((answer, index) => {

              return (
                <div className="added-answers">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.onChangeCorrectAnswer}
                        value={index}
                        color="primary"
                      />
                    }
                    label={<Latex>{answer.label}</Latex>}

                  />

                  <IconButton aria-label="delete" className="delete-answer"
                              onClick={this.removeItemCheckBox.bind(this, index)}
                  >
                    <DeleteIcon/> Smazat
                  </IconButton>
                </div>
              )
            })}
            <div className="add-answer">
              <h2>Přidat odpověď</h2><br />
                <textarea
                  required
                  id="task-input-answer"
                  value={answer.label}
                  onChange={this.onTextBoxChangeAnswer}
                />
              <div className="LatexPreviewAnswer">
                <Latex>{answer.label}</Latex>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.addItemCheckBox}
              >
                Přidat odpověd
              </Button>
            </div>

          </FormGroup>
        );

      case 'radio':
        return (
          <div>
            (Zaškrtněte správnou odpověď)
            {this.state.radioBoxAnswers.map((answerLabel, index) => {
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

                    <IconButton aria-label="delete" className="delete-answer"
                                onClick={this.removeItemRadioBox.bind(this, index)}
                    >
                      <DeleteIcon/> smazat
                    </IconButton>
                  </RadioGroup>
                </div>

              )
            })}


            <TextField
              required
              id="task-input"
              type="text"
              variant="outlined"
              value={answer}
              onChange={this.onTextBoxChangeAnswer}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.addItemRadioBox}
            >
              Přidat odpověď
            </Button>

          </div>
        );
    }
  }

  render() {
    const {
      title,
      task,
      type,
      createQuestionError
    } = this.state;
    return (
      <div>
        <header className="Questions-header">
          Vytvořit otázku
        </header>
        <div className="CreateQuestion">
          <form>
            <h2>Název otázky</h2>
            <FormGroup controlId="task" size="large">
              <TextField
                required
                id="title-required"
                label="Nutno vyplnit"
                variant="filled"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Zadání v LaTexu</h2>

              <textarea
                required
                id="task-input"

                value={task}
                onChange={this.onTextBoxChangeTask}
              /><br/>

              <h2>Zobrazení zadání</h2>
              <div className="LatexPreview">
                <Latex>{this.state.task}</Latex>
              </div>

            </FormGroup>
            <h2>Typ odpovědi</h2>
            <Select id="selectAnswer" value={type} onChange={this.onSelectQuestionType}>
              <MenuItem value="text">Otevřená odpověď</MenuItem>
              <MenuItem value="checkbox">Více odpovědí</MenuItem>
              <MenuItem value="radio">Jedná správná odpověď</MenuItem>
            </Select>

            <div>
              {this.renderCorrectAnswer(this.state.type)}
            </div>

            <button id="createQuestionButton" onClick={this.onCreateQuestion}>
              Vytvořit otázku
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
