import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Questions/CreateQuestion.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {addNotification} from "../App/Notification";
import AddIcon from '@material-ui/icons/Add';


class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createQuestionError: '',
      title: '',
      task: '',
      type: 'text',

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
    //grab state
    const {
      title,
      task,
      type,
    } = this.state;

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
        //  addNotification("Úspěch", "Uživatel přidán.", "success");
          this.setState({
            createQuestionError: json.message,
            title: '',
            task: '',
            type: '',
          });
        } else {
       //   addNotification("Error", "Otázka nemohla být vytvořena.", "danger");
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
            <FormControlLabel
              control={
                <Checkbox
                  value="checkedB"
                  color="primary"
                />
              }
              label="Second"
            /><br/>
            <FormControlLabel
              control={
                <Checkbox
                  value="checkedB"
                  color="primary"
                />
              }
              label="Third"
            />
          </FormGroup>

        );

      case 'radio':
        return (
          <div>
            <Radio
              // checked={selectedValue === 'a'}
              // onChange={handleChange}
              value="a"
              name="radio-button-demo"
            /><br/>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
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
              <FormControl
                type="text"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
            <h2>Zadání</h2>
              <FormControl
                type="text"
                value={task}
                onChange={this.onTextBoxChangeTask}
              />
            </FormGroup>
            <h2>Typ odpovědi</h2>
            <select id="selectAnswer" value={type} onChange={this.onSelectQuestionType}>
              <option value="text">Otevřená odpověd</option>
              <option value="checkbox">Více odpovědí</option>
              <option value="radio">Jedná správná odpověď</option>
            </select>

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
