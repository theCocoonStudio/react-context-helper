import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";

const container = document.getElementById("root");

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container,
);
