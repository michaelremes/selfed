import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Questions/Questions.css";


class Questions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questionType: 'text'
    };

    this.onSelectCorrectAnswer = this.onSelectCorrectAnswer.bind(this);
  }

  onSelectCorrectAnswer(event) {
    this.setState({
      questionType: event.target.value,
    });
  }
  renderCorrectAnswer(param) {
    switch(param) {
      case 'text':
        return <FormControl
          type="text"
        />;
      case 'checkbox':
        return <input
          name="isGoing"
          type="checkbox"
        />;
      case 'radio':
        return <input
          name="isGoing2"
          type="radio"
        />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <header className="Questions-header">
          Vytvořit otázku
        </header>
        <div className="CreateQuestion">
          <form>
            <h2>Název otázky</h2>
            <FormGroup controlId="task" bsSize="large">
              <FormControl
                type="text"
              />
            </FormGroup>
            <h2>Zadání</h2>
            <FormGroup controlId="task" bsSize="large">
              <FormControl
                type="text"
              />
            </FormGroup>
            <h2>Typ odpovědi</h2>
            <select id="selectAnswer" onChange={this.onSelectCorrectAnswer}>
              <option value="text">Otevřená odpověd</option>
              <option value="checkbox">Více odpovědí</option>
              <option value="radio">Jedná správná odpověď</option>
            </select>

            <h2>Správná odpověď</h2>

            {/*{this.state.questionType}*/}
        <div>
        {this.renderCorrectAnswer(this.state.questionType)}
        </div>


          </form>
        </div>
      </div>
    );
  }
}

export default Questions;
