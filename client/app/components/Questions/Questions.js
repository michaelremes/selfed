import React, {useState, Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "../../styles/Questions/Questions.css";



class Questions extends Component {



  render() {
    return (
      <div>

            <header className="Questions-header">
              Vytvořit otázku
            </header>
      <div className="CreateQuestion">
      <form>
        <FormGroup controlId="textInput" bsSize="large">
          <FormControl
            type="username"
            placeholder="Uživatelské jméno"

          />
        </FormGroup>
      </form>
      </div>
      </div>
    );
  }
}

export default Questions;
