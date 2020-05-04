import React, {Component} from 'react';


import "../../styles/Materials/CreateMaterial.css";
import {FormGroup} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


class CreateMaterial extends Component {

  render() {
    return (
      <div className="Materials">
        <header className="Dashboard-header">
          Výukové materiály
        </header>
        <div className="Lectures">
          <form>
            <h2>Název materiálu</h2>
            <FormGroup controlId="task" size="large">
              <TextField
                required
                id="title-required"
                label="Nutno vyplnit"
                variant="filled"
                // value={title}
                // onChange={this.onTextBoxChangeTitle}
              />
              <h2>Typ materiálu</h2>
              {/*value={type} onChange={this.onSelectQuestionType}*/}
              <Select id="selectAnswer">
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="file">Soubor</MenuItem>
              </Select>


            </FormGroup>


            <button id="createTestButton" onClick={this.onCreateTest}>
              Přidat výukový materiál
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateMaterial;
