import React, {useState, Component} from "react";

import "../../styles/Questions/Questions.css";


// lists existing questions
class Questions extends Component {

  constructor(props) {
    super(props)
    this.state = {

    };


  }

  render() {
    const {
      title,
      task,
      type,
      createQuestionError
    } = this.state;
    return (

      <div></div>

    );
  }
}

export default Questions;
