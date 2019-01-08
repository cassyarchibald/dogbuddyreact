import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import Dashboard from "./Dashboard.js";

class allRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/createProfile" component={CreateProfile} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}
