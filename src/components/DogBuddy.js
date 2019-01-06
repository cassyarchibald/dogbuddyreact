import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import Person from "./Person";
import PersonCollection from "./PersonCollection";
import NewPersonForm from "./NewPersonForm";
import PlayDate from "./PlayDate";
import PlayDateCollection from "./PlayDateCollection";
import NewPlayDateForm from "./NewPlayDateForm";
import Dog from "./Dog";
import DogCollection from "./DogCollection";
import NewDogForm from "./NewDogForm";
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
    // do post request
  };

  addUser = newUser => {
    const users = this.state.users;
    users.push(newUser);
    this.setState({ users: users });
    // do post request
  };

  addPlaydate = newPlayDate => {
    const playDates = this.state.playDates;
    playDates.push(newPlayDate);
    this.setState({ playDates: playDates });
    // do post request
  };

  // TODO May not need this funtion
  // updateShowingOwnerOrDogs = () => {
  //   console.log("update showing owner");
  //   this.setState({
  //     showOwnerComponent: !this.state.showOwnerComponent,
  //     showDogsCallback: !this.state.showDogsCallback
  //   });
  //   this.loadDogs();
  //   this.loadUsers();
  // };

  //load dogs axios get method saved as loadDogs
  loadDogs() {
    axios
      .get("http://localhost:8080/dogs")
      .then(response => {
        const dogComponents = response.data._embedded.dogs.map(dog => {
          //console.log(dog);
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
              ownerLink={dog._links.person.href}
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
        const UserComponents = response.data._embedded.persons.map(user => {
          return (
            <Person
              key={user.resourceId}
              id={user.resourceId}
              firstName={user.firstName}
              lastName={user.lastName}
              city={user.city}
              state={user.state}
              zipCode={user.zipCode}
              about={user.about}
              photo={user.photo}
              dogLink={user._links.dogs.href}
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
        const PlayDateComponents = response.data._embedded.playDates.map(
          playDate => {
            return (
              <PlayDate
                key={playDate.resourceId}
                id={playDate.resourceId}
                startTime={playDate.startTime}
                endTime={playDate.endTime}
                city={playDate.city}
                state={playDate.state}
                zipCode={playDate.zipCode}
                status={playDate.status}
              />
            );
          }
        );
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
    this.loadUsers();
    // API request to load dogs
    this.loadDogs();
    // API request to laod playdates
    //this.loadPlaydates();
  }

  render() {
    return (
      <section>
        <div className="text">
          <h1 className="text-center">Dog Buddy</h1>
        </div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/dogs">Dogs</Link>
              </li>
              <li>
                <Link to="/addPerson">Add Person</Link>
              </li>
              <li>
                <Link to="/addDog">Add Dog</Link>
              </li>
              <li>
                <Link to="/addPlayDate">Add Playdate</Link>
              </li>
            </ul>
            <h4 duration={5000} className="alertMessage text-center">
              {this.state.alertMessage}
            </h4>
            <Route
              exact
              path="/"
              render={() => (
                //<NewPersonForm />
                //<NewPlayDateForm />
                <DogCollection dogComponentsCollection={this.state.dogs} />
              )}
            />
            <Route path="/search" render={() => <Search />} />
            <Route
              path="/users"
              render={() => <PersonCollection users={this.state.users} />}
            />
            <Route
              path="/dogs"
              render={() => (
                <DogCollection
                  dogComponentsCollection={this.state.dogs}
                  addDogCallback={this.addDogCallback}
                />
              )}
            />
            <Route
              path="/addPerson"
              render={() => (
                <NewPersonForm addPersonCallback={this.state.addPerson} />
              )}
            />
            <Route
              path="/addDog"
              render={() => <NewDogForm addDogCallback={this.state.addDog} />}
            />
            <Route
              path="/addPlayDate"
              render={() => (
                <NewPlayDateForm addPlayDateCallback={this.state.addPlayDate} />
              )}
            />
          </div>
        </Router>
      </section>
    );
    // Add ul for router links to home, search, users, dogs, dashboard, maybe sign out/sign up?
    // Add a router with routes  to users/dogs /passing the route this.state.users or dogs
  }
}

DogBuddy.propTypes = {
  // Dogs
  id: PropTypes.number,
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  photo: PropTypes.string,
  breed: PropTypes.string,
  preferredPlayBuddy: PropTypes.string,
  // Playdate
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  status: PropTypes.string,
  // Person
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string
};

export default DogBuddy;
