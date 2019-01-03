import React, { Component } from "react";
import PropTypes from "prop-types";
import "./DogBuddy.css";

class DogBuddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dogs: [],
      messages: [],
      alertMessage: ""
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  //load dogs axios get method saved as loadDogs

  // load users axios get method saved as loadUsers

  // load messages axios get method saved as loadMessages

  // componentDidMount method that loads the users/dogs/messages

  render() {
    return <h1>Dog Buddy App</h1>;
    // Add ul for router links to home, search, users, dogs, dashboard, maybe sign out/sign up?
    // Add a router with routes  to users/dogs /passing the route this.state.users or dogs
  }
}

DogBuddy.propTypes = {};

export default DogBuddy;
