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

const Latex = require('react-latex');

class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createQuestionError: '',
      title: '',
      task: '',
      type: 'checkbox',
      answer: '',
      answers: [],
      correctAnswers: []
    };

    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onTextBoxChangeTask = this.onTextBoxChangeTask.bind(this);
    this.onTextBoxChangeAnswer = this.onTextBoxChangeAnswer.bind(this);

    this.onSelectQuestionType = this.onSelectQuestionType.bind(this);
    this.onCreateQuestion = this.onCreateQuestion.bind(this);

    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);

    this.addCorrectAnswer = this.addCorrectAnswer.bind(this);



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
      answer: event.target.value,
    });
  }

  addAnswer() {
    this.setState(previousState => ({
      answers: [...previousState.answers, this.state.answer],
      answer: ''
    }));
  }

  addCorrectAnswer(value) {
    console.log(value);
    this.setState(previousState => ({
      correctAnswers: [...previousState.correctAnswers, value],

    }));

  }


  removeAnswer(index) {
    let array = [...this.state.answers]; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({answers: array});
    }
  }




  onCreateQuestion() {

    const {
      title,
      task,
      type,
      answers,
      correctAnswers
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
        correctAnswers: correctAnswers,
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
            correctAnswers: [],
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
      answers

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

            {this.state.answers.map((answerLabel, index) => {
              return (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={this.addCorrectAnswer.bind(this, index)}

                        color="primary"
                      />
                    }
                    label={answerLabel}

                  />

                  <IconButton aria-label="delete" className="delete-answer"
                              onClick={this.removeAnswer.bind(this, index)}
                  >
                    <DeleteIcon/> smazat
                  </IconButton>
                </div>
              )
            })}

            <TextField
              id="task-input"
              type="text"
              variant="outlined"
              value={answer}
              onChange={this.onTextBoxChangeAnswer}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.addAnswer}
            >
              Přidat odpověd
            </Button>

          </FormGroup>
        );

      case 'radio':
        return (
          <div>

            {this.state.answers.map((answerLabel, index) => {
              return (
                <div className="radio-answer">
                  <RadioGroup value=" ">
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
                                onClick={this.removeAnswer.bind(this, index)}
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
              onClick={this.addAnswer}
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
              <MenuItem value="text">Otevřená odpověd</MenuItem>
              <MenuItem value="checkbox">Více odpovědí</MenuItem>
              <MenuItem value="radio">Jedná správná odpověď</MenuItem>
            </Select>

            <h2>Správná odpověď</h2>

            <div>
              {this.renderCorrectAnswer(this.state.type)}
            </div>

            <button onClick={this.onCreateQuestion}>
              Vytvořit otázku
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
