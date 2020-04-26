import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Questions/CreateQuestion.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {addNotification} from "../App/Notification";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

import Iframe from 'react-iframe'

const Latex = require('react-latex');

class CreateQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createQuestionError: '',
      title: '',
      task: '',
      type: 'radio',
      answer: {
        label: '',
        correct: false,
        points: '',
        selected: false
      },

      answers: [],
      textAnswer: '',
    };

    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onTextBoxChangeTask = this.onTextBoxChangeTask.bind(this);
    this.onTextBoxChangeAnswer = this.onTextBoxChangeAnswer.bind(this);

    this.onSelectQuestionType = this.onSelectQuestionType.bind(this);
    this.onCreateQuestion = this.onCreateQuestion.bind(this);

    this.addItemAnswers = this.addItemAnswers.bind(this);
    this.removeItemAnswers = this.removeItemAnswers.bind(this);

    this.addTextAnswer = this.addTextAnswer.bind(this);
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

  addTextAnswer(event) {
    this.setState({
     textAnswer: event.target.value
    });
  }

  onChangeCorrectAnswer(event) {

    let index = event.target.value;
    let array = [...this.state.answers]; // make a separate copy of the array

    if(this.state.type === 'radio') {
      array.map((answer) => {
        answer.correct = false;
      });
    }

    if (index !== -1) {
      let answer = {...array[index]};

      answer.correct = event.target.checked;
      array[index] = answer;
    }
    this.setState({
      answers: array,
     });

  }

  addItemAnswers() {
    this.setState(previousState => ({
      answers: [...previousState.answers, this.state.answer],
      answer: {label: '', correct: false},
    }));
  }


  removeItemAnswers(index) {
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
      textAnswer
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
        textAnswer: textAnswer,
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
            textAnswer: '',
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
        return <textarea
          id="task-input"
          onChange={this.addTextAnswer}
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
                              onClick={this.removeItemAnswers.bind(this, index)}
                  >
                    <DeleteIcon/> Smazat
                  </IconButton>
                </div>
              )
            })}
            <div className="add-answer">
              <h2>Přidat odpověď</h2><br />
                <textarea
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
                onClick={this.addItemAnswers}
              >
                Přidat odpověd
              </Button>
            </div>

          </FormGroup>
        );

      case 'radio':
        return (
          <FormGroup>
            <h3>(Zaškrtněte správné odpovědi)</h3>
            <RadioGroup onChange={this.onChangeCorrectAnswer} >
            {this.state.answers.map((answer, index) => {
              return (
                <div className="added-answers">

                    <FormControlLabel
                      control={
                        <Radio


                          color="primary"
                        />
                      }
                      value={index.toString()}
                   //   value={"test"}
                      label={<Latex>{answer.label}</Latex>}

                    />

                    <IconButton aria-label="delete" className="delete-answer"
                                onClick={this.removeItemAnswers.bind(this, index)}
                    >
                      <DeleteIcon/> smazat
                    </IconButton>

                </div>

              )
            })}
            </RadioGroup>

            <div className="add-answer">
              <h2>Přidat odpověď</h2><br />

              <textarea
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
              onClick={this.addItemAnswers}
            >
              Přidat odpověď
            </Button>

          </div>
          </FormGroup>
        );
    }
  }

  render() {
    const {
      title,
      task,
      type,
    } = this.state;
    return (
      <div>
        <header className="Questions-header">
          Vytvořit otázku
        </header>
        <div className="web-view">
          <Iframe src="../LaTex.html">
            Zobrazení návodu se nepodařilo
          </Iframe>

        </div>
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
              <h3>(LaTex výraz je potřeba napsat mezi dva znaky dolaru '$' ) </h3>

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
