import React, {Component} from "react";

import '../../styles/Tests/StudentTests.css';



class StudentTests extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //
    //
    // };
  }

  componentDidMount() {
    // fetch('/api/tests')
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

  render() {
    // const {
    //
    // } = this.state;

      return (
        <div>
          <header className="StudentTests-header">
            Seznam testů
          </header>
          <div className="TestList">
          </div>
        </div>
      );
    }

}


export default StudentTests;
