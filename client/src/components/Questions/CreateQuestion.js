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


class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createQuestionError: '',
      title: '',
      task: '',
      type: 'text',
      radioAnswers: [],
      checkBoxAnswers: [],

    };

    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onTextBoxChangeTask = this.onTextBoxChangeTask.bind(this);

    this.onSelectQuestionType = this.onSelectQuestionType.bind(this);
    this.onCreateQuestion = this.onCreateQuestion.bind(this);
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
          addNotification("Úspěch", "Uživatel přidán.", "success");
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

    switch (param) {
      case 'text':
        return <FormControl
          type="text"
        />;
      case 'checkbox':
        return (
          <FormGroup>
            {this.state.checkBoxAnswers.map((value, index) => {
              return (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        // onChange={handleChange('checkedB')}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="First"
                  /><br/>
                </div>
              )
            })}


            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState(previousState => ({
                  checkBoxAnswers: [...previousState.checkBoxAnswers, 'new value']
                }));
              }}
            >
              Přidat odpověd
            </Button>
          </FormGroup>
        );

      case 'radio':
        return (
          <div>
            <RadioGroup aria-label="radio" name="radio">
              {this.state.radioAnswers.map((value, index) => {
                return (
                  <div>
                    <FormControlLabel
                      control={<Radio color="primary"/>}
                      // checked={selectedValue === 'a'}
                      // onChange={handleChange}
                      value={value}
                      label="odpoved"
                      name="radio-button-demo"
                    />
                  </div>
                )
              })}
            </RadioGroup>


            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState(previousState => ({
                  radioAnswers: [...previousState.radioAnswers, 'new value']
                }));
              }}
            >
              Přidat odpověd
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
              <h2>Zadání</h2>
              <TextField
                required
                id="task-input"
                type="text"
                variant="outlined"
                value={task}
                onChange={this.onTextBoxChangeTask}
              />
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
