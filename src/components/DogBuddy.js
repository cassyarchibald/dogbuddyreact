import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import Person from "./Person";
import PlayDate from "./PlayDate";
import Dog from "./Dog";
import axios from "axios";
import Search from "./Search";

class DogBuddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dogs: [],
      playDates: [],
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
  loadDogs() {
    axios
      .get("http://localhost:8080/dogs")
      .then(response => {
        const dogComponents = response.data.map(dog => {
          return (
            <Dog
              key={dog.id}
              id={dog.id}
              name={dog.name}
              age={dog.age}
              size={dog.size}
              vaccinated={dog.vaccinated}
              about={dog.about}
              photo={dog.photo}
              breed={dog.breed}
              preferredPlayBuddy={dog.preferredPlayBuddy}
            />
          );
        });
        this.setState({
          dogs: dogComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }
  // load users axios get method saved as loadUsers
  loadUsers() {
    axios
      .get("http://localhost:8080/persons")
      .then(response => {
        const UserComponents = response.data.map(user => {
          return (
            <Person
              key={user.id}
              id={user.id}
              firstNamename={user.firstName}
              lastName={user.lastName}
              city={user.city}
              state={user.state}
              zipCode={user.zipCode}
              about={user.about}
              photo={user.photo}
            />
          );
        });
        this.setState({
          users: UserComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }
  // load playdates axios get method saved as loadMessages
  loadPlaydates() {
    axios
      .get("http://localhost:8080/playDates")
      .then(response => {
        // might need to do response.playDates
        const PlayDateComponents = response.data.map(playDate => {
          return (
            <PlayDate
              key={playDate.id}
              id={playDate.id}
              date={playDate.date}
              startTime={playDate.startTime}
              endTime={playDate.endTime}
              city={playDate.city}
              state={playDate.state}
              zipCode={playDate.zipCode}
              status={playDate.status}
            />
          );
        });
        this.setState({
          playDates: PlayDateComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }
  // componentDidMount method that loads the users/dogs/messages

  render() {
    return <h2>Dog Buddy</h2>;
    // Add ul for router links to home, search, users, dogs, dashboard, maybe sign out/sign up?
    // Add a router with routes  to users/dogs /passing the route this.state.users or dogs
  }
}

DogBuddy.propTypes = {};

export default DogBuddy;
