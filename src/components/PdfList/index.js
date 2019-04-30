import React, { Component } from "react";

import { Container } from "./styles";

export default class PdfList extends Component {
  render() {
    return (
      <Container>
        <div className="row">
          <div>
            <span>Seq.</span>
            <small>1</small>
          </div>
          <div>
            <span>Origem do Vínculo</span>
            <small>teste</small>
          </div>
          <div>
            <span>Indicadores</span>
            <small>teste2</small>
          </div>
          <div>
            <button>Fechar</button>
          </div>
        </div>
      </Container>
    );
  }
}
