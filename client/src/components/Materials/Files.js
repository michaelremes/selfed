import React, {Component} from "react";

import '../../styles/Materials/Files.css';


import GetAppIcon from '@material-ui/icons/GetApp';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFiles: []
    };

  }

  componentDidMount() {

    fetch('/api/materials')
      .then(res => res.json())
      .then(
        (files) => {
          const allFiles = files.filter(arr => arr.type === 'file');
          this.setState({
            allFiles: allFiles
          });
        },
        (error) => {
          this.setState({});
        }
      );
  };


  render() {
    const {
      allFiles
    } = this.state;

    return (
      <div id="mainTestForm">
        <header className="StudentTests-header">
          Soubory ke stažení
        </header>
        {allFiles.map((file) => {
          return (
            <div className="files">
              <div className='single-file'>

                <a href={'/uploads/' + file.title} download>
                  Stáhnout {file.title}</a><br /><GetAppIcon id='icon' fontSize='large'/>
              </div>
            </div>
          )
        })}
      </div>
    );

  }

}

export default Files;
