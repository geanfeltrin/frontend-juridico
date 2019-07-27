import React, { Component } from "react";

import { Container } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import api from "../../services/api";

export default class Calculate extends Component {
  state = {
    data: [],
    tabela: {
      data: [
        "05/14",
        "07/14",
        "08/14",
        "01/1982",
        "02/1982",
        "03/1982",
        "06/14",
        "04/1982",
        "05/1982",
        "06/1982"
      ],
      aposentadoria: ["1000", "2000", "3000", "4000"],
      aliquota: ["0.11", "0.11", "0.11", "0.11", "0.11", "0.11", "0.11", "0.11"]
    },
    newData: null,
    somaValues: null
  };

  async componentDidMount() {
    const response = await api.get("cnis/1");

    console.log(response.data);
    this.setState({ data: response.data });
    this.getData();
  }

  getData() {
    const { tabela, data } = this.state;
    let newData = [];

    if (data.data) {
      for (let j = 0; j < data.data.length; j++) {
        let loop = 0;
        newData.push({
          origem: "",
          seq: "",
          remuneracao: [],
          aliquota: []
        });
        newData[j].origem = data.data[j].Origem_Do_Vinculo;
        newData[j].seq = data.data[j].Seq;
        for (let i = 0; i < data.data[j].table.Competencia.length; i++) {
          for (let k = loop; k < tabela.data.length; k++) {
            newData[j].aliquota[k] = "0.11";
            if (data.data[j].table.Competencia[i] === tabela.data[k]) {
              newData[j].remuneracao[k] = data.data[j].table.Remuneracao[i]
                .replace(/\./g, "")
                .replace(/\,/g, ".");

              loop = k + 1;
              break;
            } else {
              newData[j].remuneracao[k] = 0;
            }
          }
        }
      }

      this.setState({ newData: newData });
      this.somaValues(newData);
    }
  }

  somaValues(data) {
    let soma = [];

    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].remuneracao.length; k++) {
        soma.push((data[i].remuneracao[k] * data[i].aliquota[k]).toFixed(2));
      }
    }
    this.setState({ somaValues: soma });
  }

  getHighestValues(soma, tabela) {}
  render() {
    if (this.state.newData) {
      console.log(this.state.newData);
    }

    return (
      <Paper>
        <Container>
          <Table>
            <TableHead />
            <TableHead>
              <TableRow>
                <TableCell>Competência</TableCell>
                <TableCell>Valor do Teto Previdenciário</TableCell>
                <TableCell>Alíquota</TableCell>
                <TableCell>
                  Valor que Deveria ter sido Recolhido Alíquota 11%
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tabela &&
                this.state.tabela.data.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>{d}</TableCell>
                    <TableCell>{this.state.tabela.aposentadoria[i]}</TableCell>
                    <TableCell>{this.state.tabela.aliquota[i]}</TableCell>
                    <TableCell>
                      {this.state.tabela.aposentadoria[i] *
                        this.state.tabela.aliquota[i]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {this.state.newData &&
            this.state.newData.map((d, i) => (
              <Table key={d.seq}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {d.origem}: Extrato previdenciário. Seq.{d.seq}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>Salário de Contribuição</TableCell>
                    <TableCell>Aliquota</TableCell>
                    <TableCell>Valor Recolhido 11%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.newData[i].remuneracao.map((r, j) => (
                    <TableRow>
                      <TableCell>{r}</TableCell>
                      <TableCell>{this.state.newData[i].aliquota[j]}</TableCell>
                      <TableCell>
                        {(r * this.state.newData[i].aliquota[j]).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ))}
        </Container>
      </Paper>
    );
  }
}
