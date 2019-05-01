import React, { Component } from "react";

import { Container } from "./styles";
import { dropWhile } from "lodash";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";

export default class PdfList extends Component {
  state = {
    sequencia: "",
    checked: [],
    Scnis: [
      {
        seq: 1,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 2,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 3,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 4,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 5,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 6,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      }
    ]
  };

  calculator(date) {
    var dados = date;
    var value = this.state.Scnis;
    var teste = value.map(value => value.seq);
    const teste2 = dados.map(d => dropWhile(value, d));
    console.log(teste2);
  }

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
    console.log(this.state.checked);
    const CNIS = [
      {
        seq: 1,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 2,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 3,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 4,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 5,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 6,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 7,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 8,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 9,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 10,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 11,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      },
      {
        seq: 12,
        OrigemdoVínculo: "teste",
        Indicadores: "teste2",
        data: {
          Competência: [],
          remuneracao: []
        }
      }
    ];
    console.log(this.state.sequencia);

    return (
      <Container>
        <List className="t">
          {CNIS.map(cnis => (
            <ListItem
              className="box"
              key={cnis.seq}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(cnis.seq)}
            >
              <div className="inside-box">
                <div className="content">
                  <span>Seq.</span>
                  {cnis.seq}
                </div>
                <div className="content">
                  <span>Origem Do Vículo</span>
                  <span>{cnis.OrigemdoVínculo}</span>
                </div>
                <div className="content">
                  <span>Indicadores</span>
                  <span>{cnis.Indicadores}</span>
                </div>
                <div className="content">
                  <Checkbox
                    checked={this.state.checked.indexOf(cnis.seq) !== -1}
                    tabIndex={-1}
                    disableRipple
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
          onClick={() => this.calculator(this.state.sequencia)}
        >
          PROCESSAR
        </Button>
      </Container>
    );
  }
}
