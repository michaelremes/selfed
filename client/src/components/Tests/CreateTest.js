import React, {Component} from "react";
import '../../styles/Tests/CreateTest.css';
import {FormControl, FormGroup} from "react-bootstrap";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";


class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',

    };

    this.onTextBoxChangeTitle = this.onTextBoxChangeTitle.bind(this);
    this.onCreateTest = this.onCreateTest.bind(this);


    this.handleDateChange = this.handleDateChange.bind(this);
  }

  onTextBoxChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  handleDateChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  componentDidMount() {
    // fetch('/api/add/test')
    //   .then(res => res.json())
    //   .then(
    //     (test) => {
    //       this.setState({
    //
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //
    //       });
    //     }
    //   )
  };

  onCreateTest(){

  }

  render() {
    const {
      title,
      selectedDate,
      tests,
      isLoading,
      error
    } = this.state;

    return (
      <div>
        <header className="CreateTest-header">
          Vytvořit test
        </header>
        <div className="CreateTest">
          <form>
            <h2>Název testu</h2>
            <FormGroup controlId="task" size="large">
              <TextField
                required
                id="filled-required"
                label="Nutno vyplnit"
                label="Nutno vyplnit"
                defaultValue="Hello World"
                variant="filled"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Přidat otázky</h2>


            </FormGroup>
            <button onClick={this.onCreateTest}>
              Vytvořit test
            </button>

          </form>
        </div>

      </div>
    );
  }
}


export default CreateTest;
