import React from "react";
import ReactDOM from 'react-dom/client';


import "./index.css";
import App from "./App";

import {BrowserRouter as Router} from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialState";

const container = document.getElementById('root');


const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <Router> 
          <StateProvider initialState={initialState} reducer={reducer}>
          <App />  
          </StateProvider>
        </Router>
    </React.StrictMode>
);