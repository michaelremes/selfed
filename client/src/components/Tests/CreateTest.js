import React, {Component} from "react";
import '../../styles/Tests/CreateTest.css';
import {FormControl, FormGroup} from "react-bootstrap";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";


class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      age: 0,
      setAge: false,
      open: false,
      setOpen: false,

    };



    // const handleChange = (event) => {
    //   setAge(event.target.value);
    // };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

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
  handleChange(event){
  //  this.state.setAge(event.target.value);
  };

   handleClose(){
  //  this.state.setOpen(false);
  };

   handleOpen() {
 //    this.state.setOpen(true);
  };

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
                defaultValue="Hello World"
                variant="filled"
                value={title}
                onChange={this.onTextBoxChangeTitle}
              />
              <h2>Přidat otázky</h2>
              <InputLabel id="demo-controlled-open-select-label">Otázka</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                // open={open}
                onClose={true}
                onOpen={false}
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Otazka1</MenuItem>
                <MenuItem value={20}>Otazka2</MenuItem>
                <MenuItem value={30}>Otazka3</MenuItem>
              </Select>

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
