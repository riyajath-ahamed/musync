import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import App from "./App";

import {BrowserRouter as Router} from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";

ReactDOM.render(
    <React.StrictMode>
        <Router> 
          <StateProvider initialState={initialState} reducer={reducer}>
          <App />  
          </StateProvider>
          
        </Router>
    </React.StrictMode>
, document.getElementById("root"));