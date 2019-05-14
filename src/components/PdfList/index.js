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
    newData: []
  };

  calculator = () => {
    const { checked } = this.state;
    const { pdfValue } = this.props;

    for (let i = 0; i < checked.length; i++) {
      for (let j = 0; j < pdfValue.length; j++) {
        if (checked[i] === pdfValue[j].Seq) {
          pdfValue.splice(j, 1);
          var novo = [...pdfValue];
        }
      }
    }
    this.setState({ newData: novo });
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
          onClick={() => this.calculator()}
        >
          PROCESSAR
        </Button>
      </Container>
    );
  }
}
