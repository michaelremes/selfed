import React, {Component} from 'react';


import "../../styles/Materials/CreateMaterial.css";
import {FormGroup} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

const ReactMarkdown = require('react-markdown')
const mdParser = new MarkdownIt(/* Markdown-it options */);


class CreateMaterial extends Component {


  constructor(props) {
    super(props);
    this.state = {
      type: 'text',


    };

    this.onSelectMaterialType = this.onSelectMaterialType.bind(this);
    this.onCreateMaterial = this.onCreateMaterial.bind(this);
    this.renderMaterialType = this.renderMaterialType.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);


  }

  onSelectMaterialType(event) {
    this.setState({
      type: event.target.value,
    });
  }

  onChangeFile(){
    //https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    //https://malcoded.com/posts/react-file-upload/
  }

  onCreateMaterial(){

  }


  handleEditorChange({html, text}) {
    console.log('handleEditorChange', html, text)
  }

  renderMaterialType(type) {
    const input = '# This is a header\n\nAnd this is a paragraph'
    switch (type) {
      case 'text':
        return (<
            div style={{ height: '70vh' }}>


            <MdEditor
              value=""
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>


          );

      case 'file':
        return (
          <div>
            <input type="file" name="file" onChange={this.onChangeFile}/>
          </div>
        );

    }

  }

  render() {

    const {
      type,
    } = this.state;
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

              <Select id="selectAnswer"  value={type} onChange={this.onSelectMaterialType}>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="file">Soubor</MenuItem>
              </Select>


            </FormGroup>

            <div>
              {this.renderMaterialType(type)}
            </div>


            <button id="createMaterialButton" onClick={this.onCreateMaterial}>
              Přidat výukový materiál
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateMaterial;
