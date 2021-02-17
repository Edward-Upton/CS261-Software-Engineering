import React from "react";
import ReactDOM from "react-dom";

import { CssBaseline } from "@material-ui/core";
import "typeface-roboto";

import reportWebVitals from "./reportWebVitals";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
