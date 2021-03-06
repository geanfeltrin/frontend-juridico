import React, { Component } from 'react';

import { Container } from './styles';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';

export default class PdfList extends Component {
  state = {
    sequencia: '',
    checked: [],
    newData: []
  };
  componentDidMount() {
    const { pdfValue } = this.props;
    this.setState({ newData: pdfValue });
  }

  calculator = () => {
    const { checked } = this.state;
    const { pdfValue } = this.props;

    if (checked.length > 0) {
      for (let i = 0; i < checked.length; i++) {
        for (let j = 0; j < pdfValue.length; j++) {
          if (checked[i] === pdfValue[j].Seq) {
            pdfValue.splice(j, 1);
            let novo = [...pdfValue];
            this.setState({ newData: novo });
          }
        }
      }
    }
  };

  exportCsv = () => {
    const { newData } = this.state;
    let keysHeader = [];
    let valuesHeader = [];
    let tableHeader = [];
    let tableData = [];
    let data = [];

    for (let i = 0; i < newData.length; i++) {
      const obj = Object.entries(newData[i]);

      const tabela = Object.entries(newData[i].Tabela);
      keysHeader = [];
      valuesHeader = [];
      tableHeader = [];
      tableData = [];
      if (tabela.length) {
        for (let k = 0; k < tabela[0][1].length; k++) {
          let aux = [];
          for (t in tabela) {
            aux.push(tabela[t][1][k]);
          }
          tableData.push(aux.join(';'));
          tableData.push('%0A');
        }
      }
      for (const [k, v] of obj) {
        if (k !== 'Tabela') {
          keysHeader.push(k);
          valuesHeader.push(v);
        }
      }
      for (const [k, v] of tabela) {
        tableHeader.push(k);
      }

      let k = keysHeader.join(';');
      let t = valuesHeader.join(';');
      let z = tableHeader.join(';');
      let v = tableData.join('');

      data.push(k);
      data.push(t);

      data.push(z);
      data.push(v);
      data.push('%0A%0A%0A');
    }

    const csvString = data.join('%0A');

    let a = document.createElement('a');
    a.href = 'data:attachment/csv,' + csvString;
    a.target = '_Blank';
    a.download = 'CNIS.csv';
    document.body.appendChild(a);
    a.click();
  };

  handleToggle = value => () => {
    const { checked } = this.state;

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { pdfValue } = this.props;
    console.log(this.state.newData);
    return (
      <Container>
        <List className="t">
          {pdfValue.map(cnis => (
            <ListItem
              className="box"
              key={cnis.Seq}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(cnis.Seq)}
            >
              <div className="inside-box">
                <section className="content">
                  <h3>Seq.</h3>
                  <p>{cnis.Seq}</p>
                </section>
                <section className="content vinculo">
                  <h3>Origem Do Vinculo</h3>
                  <p>{cnis.Origem_Do_Vinculo}</p>
                </section>
                <section className="content data">
                  <h3>Data Inicio</h3>
                  <p>{cnis.Data_Inicio}</p>
                </section>
                <section className="content data">
                  <h3>Data Fim</h3>
                  <p>{cnis.Data_Fim}</p>
                </section>
                <section className="content data">
                  <h3>Ult. Remun</h3>
                  <p>{cnis.Ult_Remun}</p>
                </section>
                <section className="content indicadores">
                  <h3>Indicadores</h3>
                  <p>{cnis.Indicadores}</p>
                </section>
                <div className="content">
                  <Checkbox
                    checked={this.state.checked.indexOf(cnis.Seq) !== -1}
                    tabIndex={-1}
                    disableRipple={false}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="btn"
          onClick={() => {
            this.calculator();
            this.exportCsv();
          }}
        >
          PROCESSAR / Exportar CSV
        </Button>
      </Container>
    );
  }
}
