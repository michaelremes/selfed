import React, {useState, Component} from "react";
import ReactTable from 'react-table';
import styled from 'styled-components'
import "../../styles/Questions/Questions.css";
// import 'react-table/react-table.css'
import api from '../../api'

// lists existing questions
class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      columns: [],
      isLoading: false,

    };
  }

 componentDidMount() {
    this.setState({ isLoading: true });

     api.getAllQuestions().then(questions => {
      this.setState({
        questions: questions.data.data,
        isLoading: false,
      })
    })
  };

  render() {
    const {
    } = this.state;
    return (

      <div>


      </div>

    );
  }
}

export default Questions;
