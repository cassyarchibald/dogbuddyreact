import React, { Component } from "react";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import "./Person";
import "./Dog.js";

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

  addDog = newDog => {
    const dogs = this.state.dogs;
    dogs.push(newDog);
    this.setState({ dogs: dogs });
  };

  addUser = newUser => {
    const users = this.state.users;
    users.push(newUser);
    this.setState({ users: users });
  };

  //load dogs axios get method saved as loadDogs

  // load users axios get method saved as loadUsers

  // load messages axios get method saved as loadMessages

  // componentDidMount method that loads the users/dogs/messages

  render() {
    const dogs = this.state.dogs;
    const users = this.state.users;
    const userCollection = users.map((users, i) => {
      //return <Person key={i} />;
    });
    return <h1>Dog Buddy App</h1>;
    // Add ul for router links to home, search, users, dogs, dashboard, maybe sign out/sign up?
    // Add a router with routes  to users/dogs /passing the route this.state.users or dogs
  }
}

DogBuddy.propTypes = {};

export default DogBuddy;
