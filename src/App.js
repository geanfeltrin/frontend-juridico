import React, { Fragment } from "react";
import Main from "./pages/main/index";
import GlobalStyle from "./styles/global";
import Calculate from "./pages/Calculate";

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Calculate />
  </Fragment>
);

export default App;
