import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Route,   BrowserRouter as Router, Switch} from 'react-router-dom'
import Construct from './Construct'
import Reserve from './Reserve'
import '../node_modules/antd/dist/antd.css'


export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/construct" component={Construct}/>
          <Route exact path="/reserve" component={Reserve}/>
        </Switch>
      </Router>
    );
  }
}