import React from "react";
import ReactDOM from "react-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import { BrowserRouter} from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App/>
    </BrowserRouter>,
  document.getElementById("root")
);


