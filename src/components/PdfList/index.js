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
    checked: []
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
    const { pdfValue } = this.props;

    return (
      <Container>
        <List className="t">
          {pdfValue.map((cnis, index) => (
            <ListItem
              className="box"
              key={cnis[index].Seq}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(cnis[index].Seq)}
            >
              <div className="inside-box">
                <div className="content">
                  <span>Seq.</span>
                  {cnis[index].Seq}
                </div>
                <div className="content">
                  <span>Origem Do Vículo</span>
                  <span>{cnis[index].Origem_Do_Vinculo}</span>
                </div>
                <div className="content">
                  <span>Indicadores</span>
                  <span>{cnis[index].Indicadores}</span>
                </div>
                <div className="content">
                  <Checkbox
                    checked={this.state.checked.indexOf(cnis[index].seq) !== -1}
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
