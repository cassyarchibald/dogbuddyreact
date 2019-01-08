import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import Dashboard from "./Dashboard.js";
import ProtectedRoute from "./ProtectedRoute.js";
import DogCollection from "./DogCollection";
import PersonCollection from "./PersonCollection";
import Search from "./Search";

class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.loggedIn,
      profileCreated: this.props.profileCreated
    };
  }
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute
          path="/dogs"
          component={
            <DogCollection dogComponentsCollection={this.props.dogs} />
          }
        />
        <ProtectedRoute
          path="/users"
          component={
            <PersonCollection
              persons={this.state.persons}
              addPersonCallback={this.state.addPerson}
            />
          }
        />
        <ProtectedRoute path="/search" component={Search} />
      </Switch>
    );
  }
}

export default AllRoutes;
