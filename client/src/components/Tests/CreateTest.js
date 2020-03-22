import React, {Component} from "react";


class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      columns: [],
      isLoading: false,

    };
  }

  componentDidMount() {
    fetch('/api/add/test')
      .then(res => res.json())
      .then(
        (test) => {
          this.setState({
            isLoading: true,
            tests: test
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
      tests,
      isLoading,
      error
    } = this.state;

    return (
      <div>
        <header className="Test-header">
          Vytvořit test
        </header>


      </div>
    );
  }
}


export default Tests;
