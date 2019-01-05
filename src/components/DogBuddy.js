import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import Person from "./Person";
import PersonCollection from "./PersonCollection";
import PlayDate from "./PlayDate";
import PlayDateCollection from "./PlayDateCollection";
import Dog from "./Dog";
import DogCollection from "./DogCollection";
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
        // console.log("Value of response.data._embedded");
        // console.log(response.data._embedded);
        // console.log("Value of response.data._embedded.dogs");
        // console.log(response.data._embedded.dogs);
        const dogComponents = response.data._embedded.dogs.map(dog => {
          // console.log("Mapping dog");
          console.log(dog);
          console.log(dog.name);
          return (
            <Dog
              key={dog.resourceId}
              id={dog.resourceId}
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
        // console.log("dog component value");
        // console.log(dogComponents);
        this.setState({
          dogs: dogComponents
        });
        // console.log("Value of dogs in state ");
        // console.log(this.state.dogs);
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
              key={user.resourceId}
              id={user.resourceId}
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
              key={playDate.resourceId}
              id={playDate.resourceId}
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
  // componentDidMount method that loads the users/dogs/playdates
  componentDidMount() {
    // API request to load users
    //this.loadUsers();
    // API request to load dogs
    this.loadDogs();
    // API request to laod playdates
    //this.loadPlaydates();
  }

  render() {
    return (
      <div>{this.state.dogs}</div>
      // <section>
      // <div className="text">
      //   <h1 className="text-center">Dog Buddy</h1>​
      // </div>
      // <Router>
      //   <div>
      //     <ul>
      //       <li>
      //         <Link to="/">Home</Link>
      //       </li>
      //       <li>
      //         <Link to="/search">Search</Link>
      //       </li>
      //       <li>
      //         <Link to="/customers">Users</Link>
      //       </li>
      //       <li>
      //         <Link to="/dogs">Dogs</Link>
      //       </li>
      //     </ul>
      //     <h4 duration={5000} className="alertMessage text-center">
      //       {this.state.alertMessage}
      //     </h4>
      //     <Route
      //       exact
      //       path="/"
      //       render={() => <DogCollection dogs={this.state.dogs} />}
      //     />
      //     <Route
      //       path="/search"
      //       render={() => <Search updateMoviesCallback={this.loadMovies} />}
      //     />
      //     <Route
      //       path="/users"
      //       render={() => <PersonCollection users={this.state.users} />}
      //     />
      //     <Route
      //       path="/dogs"
      //       render={() => <DogCollection dogs={this.state.dogs} />}
      //     />
      //   </div>
      // </Router>
      // </section>
    );
    // Add ul for router links to home, search, users, dogs, dashboard, maybe sign out/sign up?
    // Add a router with routes  to users/dogs /passing the route this.state.users or dogs
  }
}

DogBuddy.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  photo: PropTypes.string,
  breed: PropTypes.string,
  preferredPlayBuddy: PropTypes.string
};

export default DogBuddy;
