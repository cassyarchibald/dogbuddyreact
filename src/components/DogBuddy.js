import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import ProtectedRoute from "./ProtectedRoute";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import Login from "./Login";

import Person from "./Person";
import PersonCollection from "./PersonCollection";
import CreateProfile from "./CreateProfile";
import PlayDate from "./PlayDate";
import PlayDateCollection from "./PlayDateCollection";
import NewPlayDateForm from "./NewPlayDateForm";
import Dashboard from "./Dashboard";
import Dog from "./Dog";
import DogCollection from "./DogCollection";
import NewDogForm from "./NewDogForm";
import axios from "axios";
import Search from "./Search";
import firebase, { auth, provider } from "../firebase.js";

class DogBuddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      dogs: [],
      playDates: [],
      alertMessage: "",
      currentItem: "",
      // application will act like user is not logged in on initial load
      user: null,
      isLoggedIn: false,
      profileCreated: false
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  verifyProfileCreated = () => {
    // do this method if user logs in
    // find person by uid
    // if get request is successful,
    // update state of
    // profile created to true
    // else, redirect to createprofile
  };

  // TODO - Untested - need to know owner id to add to
  // new dog form/post to /persons/${personId}/dogs
  // Could pass id back via callback ?
  addDog = newDog => {
    axios
      .post("http://localhost:8080/dogs", newDog)
      .then(response => {
        let updatedData = this.state.dogs;
        updatedData.push(newDog);
        this.setState({ dogs: updatedData });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  removeDog = dogId => {
    // loop through dogs
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request
    axios
      .delete("http://localhost:8080/dogs")
      .then(response => {
        let deleteIndex = -1;
        this.state.dogs.forEach((dog, index) => {
          if (dogId === dog.id) {
            deleteIndex = index;
          }
        });

        this.state.dogs.splice(deleteIndex, 1);

        this.setState({
          dogs: this.state.dogs
        });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  addPerson = newPerson => {
    axios
      .post("http://localhost:8080/persons", newPerson)
      .then(response => {
        let updatedData = this.state.persons;
        updatedData.push(newPerson);
        this.setState({ persons: updatedData });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  removePerson = personId => {
    // loop through users
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request
    // QUESTION should I also do axios request to delete their dogs/
    // any playdates associated with them (might be a cascade setting in api)
    axios
      .delete("http://localhost:8080/persons")
      .then(response => {
        let deleteIndex = -1;
        this.state.persons.forEach((person, index) => {
          if (personId === person.id) {
            deleteIndex = index;
          }
        });

        this.state.persons.splice(deleteIndex, 1);

        this.setState({
          persons: this.state.persons
        });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  // TODO - on hold, can't test until we have a way
  // to determine who the receiver/requestor is
  // reçiever = dropdown list on form?
  // requestor = person currently logged in
  // do post to playdates/manually reload the playdates
  // to update the requestor/receiver playdates
  addPlayDate = newPlayDate => {
    axios
      .post("http://localhost:8080/playDates", newPlayDate)
      .then(response => {
        let updatedData = this.state.playDates;
        updatedData.push(newPlayDate);
        this.setState({ playDates: updatedData });
        this.loadPlaydates();
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  removePlayDate = playDateId => {
    // loop through playDates
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request for playdate
    // reload all playdates to update requestor/receiver sides
    axios
      .delete("http://localhost:8080/playDates/")
      .then(response => {
        let deleteIndex = -1;
        this.state.playDates.forEach((playDate, index) => {
          if (playDateId === playDate.id) {
            deleteIndex = index;
          }
        });

        this.state.playDates.splice(deleteIndex, 1);

        this.setState({
          playDates: this.state.playDates
        });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  //load dogs axios get method saved as loadDogs
  loadDogs() {
    axios
      .get("http://localhost:8080/dogs")
      .then(response => {
        const dogComponents = response.data._embedded.dogs.map(dog => {
          // console.log("value of user in loading dogs");
          // console.log(this.state.user);
          return (
            <Dog
              user={this.state.user}
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
        console.log(error.message);
      });
  }
  // load users axios get method saved as loadUsers
  loadUsers() {
    axios
      .get("http://localhost:8080/persons")
      .then(response => {
        const PersonComponenets = response.data._embedded.persons.map(
          person => {
            return (
              <Person
                key={person.resourceId}
                id={person.resourceId}
                firstName={person.firstName}
                lastName={person.lastName}
                city={person.city}
                state={person.state}
                zipCode={person.zipCode}
                about={person.about}
                photo={person.photo}
                dogLink={person._links.dogs.href}
                receievedPlayDatesLink={person._links.receivedPlaydates.href}
                requestedPlayDatesLink={person._links.requestedPlaydates.href}
              />
            );
          }
        );
        this.setState({
          persons: PersonComponenets
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // componentDidMount method that loads the users/dogs/playdates
  componentDidMount() {
    // API request to load users
    this.loadUsers();
    // API request to load dogs
    this.loadDogs();
    // API request to load playdates
    //this.loadPlaydates();

    // FIREBASE DATABASE

    // remember people that have logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("on auth change update user state");
        this.setState({ user });
        console.log(this.state.user);
        //this.loadDogs();
      }
    });
  }

  login = () => {
    console.log("in start of login");
    // handles the callback for us
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      console.log("in sign in with popup");
      this.setState({
        user
      });
      this.loadDogs();
    });
    // reload dog components so user is now not null
    // schedule playdate shows
  };

  logout = () => {
    auth.signOut().then(() => {
      console.log("in logout");
      this.setState({
        user: null
      });
      // QUESTION do i need to manually
      // reload the dogs ?
      //this.loadDogs();
    });
  };

  render() {
    return (
      //<section>
      <Router>
        <div>
          <nav id="router-list">
            <Link to="/">login</Link>
            <Link to="/createProfile">Create Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dogs">View Dogs</Link>
            <Link to="/users">View Users</Link>
            <Link to="search">Search</Link>
          </nav>
          <Switch>
            <Route
              path="/"
              render={() => (
                <Login
                  user={this.state.user}
                  loginCallback={this.login}
                  logoutCallback={this.logout}
                />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  user={this.state.user}
                  loginCallback={this.login}
                  logoutCallback={this.logout}
                />
              )}
            />
            <ProtectedRoute
              path="/dashboard"
              render={() => (
                <Dashboard
                  isLoggedIn={this.state.isLoggedIn}
                  profileCreated={this.state.profileCreated}
                />
              )}
            />
            <ProtectedRoute
              path="/dogs"
              render={() => (
                <DogCollection dogComponentsCollection={this.props.dogs} />
              )}
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
            />
            <ProtectedRoute
              path="/users"
              render={() => (
                <PersonCollection
                  persons={this.state.persons}
                  addPersonCallback={this.state.addPerson}
                />
              )}
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
            />
            <ProtectedRoute
              path="/search"
              component={Search}
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
            />
          </Switch>
        </div>
      </Router>
      // <header>
      //   <div className="wrapper">
      //     {this.state.user ? (
      //       <button onClick={this.logout}>Logout</button>
      //     ) : (
      //       <button onClick={this.login}>Log In</button>
      //     )}
      //   </div>
      // </header>
      // <div className="text">
      //   <h1 className="text-center">Dog Buddy</h1>
      // </div>
      // {this.state.user ? (
      //   <Dashboard
      //     user={this.state.user}
      //     persons={this.state.persons}
      //     addPersonCallback={this.state.addPerson}
      //   />
      // ) : null}

      // <Router>
      //   <div>
      //     <ul id="router-list">
      //       <li>
      //         <Link to="/">Home</Link>
      //       </li>
      //       <li>
      //         <Link to="/search">Search</Link>
      //       </li>
      //       <li>
      //         <Link to="/users">Users</Link>
      //       </li>
      //       <li>
      //         <Link to="/dogs">Dogs</Link>
      //       </li>
      //       <li>
      //         <Link to="/addPerson">Add Person</Link>
      //       </li>
      //       <li>
      //         <Link to="/addDog">Add Dog</Link>
      //       </li>
      //       <li>
      //         <Link to="/addPlayDate">Add Playdate</Link>
      //       </li>
      //     </ul>
      //     <h4 duration={5000} className="alertMessage text-center">
      //       {this.state.alertMessage}
      //     </h4>
      //     <Route
      //       exact
      //       path="/"
      //       render={() => (
      //         <DogCollection dogComponentsCollection={this.state.dogs} />
      //       )}
      //     />
      //     <Route path="/search" render={() => <Search />} />
      //     <Route
      //       path="/users"
      //       render={() => (
      //         <PersonCollection
      //           persons={this.state.persons}
      //           addPersonCallback={this.state.addPerson}
      //         />
      //       )}
      //     />
      //
      //     <Route
      //       path="/dogs"
      //       render={() => (
      //         <DogCollection
      //           dogComponentsCollection={this.state.dogs}
      //           addDogCallback={this.addDog}
      //           user={this.state.user}
      //         />
      //       )}
      //     />
      //     <Route
      //       path="/addPerson"
      //       render={() => (
      //         <CreateProfile addPersonCallback={this.addPerson} />
      //       )}
      //     />
      //     <Route
      //       path="/addDog"
      //       render={() => <NewDogForm addDogCallback={this.addDog} />}
      //     />
      //     <Route
      //       path="/addPlayDate"
      //       render={() => (
      //         <NewPlayDateForm addPlayDateCallback={this.addPlayDate} />
      //       )}
      //     />
      //   </div>
      // </Router>
      //</section>
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
  lastName: PropTypes.string
};

export default DogBuddy;
