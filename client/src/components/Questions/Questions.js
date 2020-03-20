import React, {useState, Component} from "react";
import styled from 'styled-components'
import '../../styles/Questions/Questions.css';
import MaterialTable from 'material-table';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;


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
    fetch('/api/questions')
      .then(res => res.json())
      .then(
        (question) => {
          this.setState({
            isLoading: true,
            questions: question
          });
        },
        (error) => {
          this.setState({
            isLoading: true,
            error
          });
        }
      )
  };

  render() {

    const {
      questions,
      isLoading,
      error
    } = this.state;

    const columns = [
      {title: 'Name', field: 'name'},
      {title: 'Surname', field: 'surname'},
      {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
      },
    ];
    // let showTable = true;
    //
    // if (!questions.length) {
    //   showTable = false;
    // }

    // console.log("tabulka je " + showTable);

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoading) {
    //   return <div>Loading...</div>;
    // } else {

    return (
      <div>
        <header className="Questions-header">
          Vytvořené otázky
        </header>
      <div className="QuestionList" >

      <MaterialTable
        title="Editable Example"
        columns={columns}
        data={questions}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return {...prevState, data};
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return {...prevState, data};
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return {...prevState, data};
                });
              }, 600);
            }),
        }}
      />
      </div>
      </div>
    );


  }
}

export default Questions;
