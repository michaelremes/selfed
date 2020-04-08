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
      type: 'radio',
      answer: '',
      checkBoxAnswers: [],
      radioBoxAnswers: [],

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

  addItemCheckBox() {
    this.setState(previousState => ({
      checkBoxAnswers: [...previousState.checkBoxAnswers, this.state.answer],
      answer: ''
    }));
  }


  removeItemCheckBox(index) {
    let array = [...this.state.checkBoxAnswers]; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({checkBoxAnswers: array});
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
    addNotification("Úspěch", "Uživatel přidán.", "success");
    //grab state
    const {
      title,
      task,
      type,
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
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          // addNotification("Úspěch", "Uživatel přidán.", "success");
          this.setState({
            createQuestionError: json.message,
            title: '',
            task: '',
            type: '',
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

    } = this.state;
    switch (param) {
      case 'text':
        return  <textarea
          required
          id="task-input"

          // value={task}
          // onChange={this.onTextBoxChangeTextAnswer}
        />;
      case 'checkbox':
        return (
          <FormGroup>

            {this.state.checkBoxAnswers.map((answerLabel, index) => {
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

                  <IconButton aria-label="delete" className="delete-answer"
                              onClick={this.removeItemCheckBox.bind(this, index)}
                  >
                    <DeleteIcon/> smazat
                  </IconButton>
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
              onClick={this.addItemCheckBox}
            >
              Přidat odpověd
            </Button>

          </FormGroup>
        );

      case 'radio':
        return (
          <div>
            <RadioGroup aria-label="radio" name="radio">
              {this.state.radioBoxAnswers.map((answerLabel, index) => {
                return (
                  <div className="radio-answer">
                    <FormControlLabel
                      control={
                        <Radio

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
                  </div>
                )
              })}
            </RadioGroup>

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
                id="filled-required"
                type="text"
                variant="outlined"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Zadání v LaTexu</h2>

              <textarea
                required
                id="task-input"

                value={task}
                onChange={this.onTextBoxChangeTask}
              /><br />

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
