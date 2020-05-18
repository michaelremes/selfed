import React, {Component} from "react";

import '../../styles/Materials/Materials.css';
import MaterialTable from "material-table";
import ReactMarkdown from "react-markdown";

const Latex = require('react-latex');

class StudentTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: [],
      currentMaterial: '',
      materialOpen: false,
    };

    this.renderMaterial = this.renderMaterial.bind(this);
    this.renderListOfMaterials = this.renderListOfMaterials.bind(this);

    this.forwardBack = this.forwardBack.bind(this);
  }


  componentDidMount() {

    fetch('/api/materials')
      .then(res => res.json())
      .then(
        (materials) => {
          this.setState({
            materials: materials
          });
        },
        (error) => {
          this.setState({});
        }
      );
  };



  forwardBack() {
    this.setState({
      materialOpen: false
    });
    this.props.history.push("/student/materials");
  }



  renderMaterial() {
    const {
      currentMaterial
    } = this.state;
    return (
      <div id="mainTestForm">
        <header className="StudentTests-header">
          {currentMaterial.title}
          <button className="button logout" onClick={this.forwardBack}>Zpět</button>
        </header>

        <div className="MaterialView">
          <ReactMarkdown source={currentMaterial.text} />
        </div>

      </div>

    )
  }

  renderListOfMaterials() {
    const {
      materials
    } = this.state;
    const columns = [
      {title: 'Materiál', field: 'title'},
      {title: 'Typ', field: 'type'},
    ];


    return (
      <div>
        <header className="StudentTests-header">
          Seznam testů
        </header>
        <div className="TestList">
          <MaterialTable
            title="Seznam aktivních testů"
            columns={columns}
            data={materials}
            actions={[
              {
                icon: 'send',
                tooltip: 'Otevřít material',

                onClick: (event, material) => {
                  this.setState(
                    {
                      materialOpen: true,
                      currentMaterial: material
                    }
                  );
                }
              }
            ]}
            localization={{
              header: {
                actions: 'Akce'
              },
              toolbar: {
                searchPlaceholder: 'Vyhledat',
                searchTooltip: 'Vyhledat'
              },
              pagination: {
                labelRowsSelect: 'Řádek',
                firstTooltip: "První stránka",
                previousTooltip: "Předchozí stránka",
                nextTooltip: "Další stránka",
                lastTooltip: "Poslední stránka"
              },
              body: {
                emptyDataSourceMessage: "Žádná data k zobrazení",
              }
            }}
          />
        </div>
      </div>
    );
  }

  render() {

    /*render list of tests, if one test is selected, rerender the page and show test */
    return (
      <div>
        {
          this.state.materialOpen ? this.renderMaterial() : this.renderListOfMaterials()
        }
      </div>
    );

  }

}

export default StudentTests;
