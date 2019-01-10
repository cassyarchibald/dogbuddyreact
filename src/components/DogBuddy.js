import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from "react-router-dom";
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
      profileCreated: false,
      uid: null,
      // update with person object
      // when logged in/profile created?
      // via findByUid method
      currentUserObject: null,
      currentUserDogs: null,
      currentUserRequestedPlayDates: null,
      currentUserReceivedPlayDates: null,
      redirecToCreateProfile: false
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  // new dog form/post to /persons/${personId}/dogs
  addDog = newDog => {
    console.log("in add dog in dogbuddy");
    newDog.person = `/persons/${this.state.currentUserObject.resourceId}`;

    axios
      .post(`http://localhost:8080/dogs/`, newDog)
      .then(response => {
        console.log("adding dog success");
        let updatedData = this.state.dogs;
        updatedData.push(newDog);
        this.setState({ dogs: updatedData });
        this.loadDogs();
        this.loadUsers();
      })
      .catch(error => {
        console.log("adding dog failure");
        this.setState({ alertMessage: error.message });
        console.log(error.message);
      });
  };

  removeDog = dogId => {
    console.log("in remove dog from dogbuddy");
    // loop through dogs
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request
    console.log(`http://localhost:8080/dogs/${dogId}`);
    axios
      .delete(`http://localhost:8080/dogs/${dogId}`)
      .then(response => {
        console.log("remove dog successful?");
        console.log(response);
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
        console.log(this.state.dogs);
      })
      .catch(error => {
        console.log("remove dog not successful");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  // occures after CreateProfile form is submitted
  // if successful, update persons/profileCreated
  addPerson = newPerson => {
    console.log("in add person in dogbuddy");
    newPerson.uid = this.state.uid;
    axios
      .post("http://localhost:8080/persons", newPerson)
      .then(response => {
        console.log(response);
        console.log("Added person");
        let updatedData = this.state.persons;
        updatedData.push(newPerson);
        this.setState({ persons: updatedData, profileCreated: true });
        this.loadUsers();
      })
      .catch(error => {
        console.log("did not add person");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  removePerson = personId => {
    console.log("in delete person in dog buddy");
    // loop through users
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request
    // QUESTION should I also do axios request to delete their dogs/
    // any playdates associated with them (might be a cascade setting in api)
    axios
      .delete(`http://localhost:8080/persons/${personId}`)
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

  loadUsersDogs(personId) {
    axios
      .get(`http://localhost:8080/persons/${personId}/dogs`)
      .then(response => {
        // console.log("loading dogs from resposne");
        // console.log(response.data);
        const dogComponents = response.data._embedded.dogs.map(dog => {
          // console.log("value of user in loading dogs");
          // console.log(this.state.user);
          // console.log(this.props);
          return (
            <Dog
              user={this.state.currentUserObject}
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
              addPlayDateCallback={this.props.addPlayDateCallback}
              showEditDelete={true}
              editDogCallback={this.props.editDogCallback}
              removeDogCallback={this.props.removeDogCallback}
            />
          );
        });
        // console.log(dogComponents);

        this.setState({
          dogs: dogComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  //TODO //TODO //TODO
  loadUsersRequestedPlayDates(personId) {
    axios
      .get(`http://localhost:8080/persons/${personId}/requestedPlaydates`)
      .then(response => {
        // console.log("loading dogs from resposne");
        // console.log(response.data);
        const requestedPlayDatesComponents = response.data._embedded.dogs.map(
          playDate => {
            // console.log("value of user in loading dogs");
            // console.log(this.state.user);
            // console.log(this.props);
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
                location={playDate.location}
                details={playDate.details}
                addPlayDateCallback={this.addPlayDate}
                editPlayDateCallback={this.updatePlayDate}
              />
            );
          }
        );
        // console.log(dogComponents);

        this.setState({
          currentUserRequestedPlayDates: requestedPlayDatesComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  //TODO //TODO //TODO
  loadUsersRecievedPlayDates(personId) {
    axios
      .get(`http://localhost:8080/persons/${personId}/recievedPlaydates`)
      .then(response => {
        // console.log("loading dogs from resposne");
        // console.log(response.data);
        const recievedPlayDatesComponents = response.data._embedded.dogs.map(
          playDate => {
            // console.log("value of user in loading dogs");
            // console.log(this.state.user);
            // console.log(this.props);
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
                location={playDate.location}
                details={playDate.details}
                addPlayDateCallback={this.addPlayDate}
                editPlayDateCallback={this.updatePlayDate}
              />
            );
          }
        );
        // console.log(dogComponents);

        this.setState({
          currentUserRequestedPlayDates: recievedPlayDatesComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  //TODO //TODO //TODO
  updateUser = updatedPerson => {
    console.log("in update user in dog buddy");
    // do axios patch request or
    // would it be a put?
    updatedPerson.uid = this.state.uid;
    axios
      .patch(
        `http://localhost:8080/persons/${
          this.state.currentUserObject.resourceId
        }`,
        updatedPerson
      )
      .then(response => {
        console.log("successful update of person");
        let updatedData = this.state.persons;
        updatedData.push(updatedPerson);
        this.setState({ persons: updatedData });
      })
      .catch(error => {
        console.log("unable to update person");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  //TODO //TODO //TODO
  updateDog = (updatedDog, dogId) => {
    console.log("in update dog in dogbuddy");
    // do axios patch request or
    // would it be a put?
    axios
      .patch(`http://localhost:8080/dogs/${dogId}`, updatedDog)
      .then(response => {
        console.log("update dog successful");
        let updatedData = this.state.dogs;
        updatedData.push(updatedDog);
        this.setState({ dogs: updatedData });
      })
      .catch(error => {
        console.log("update dog not successful");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  updatePlayDate = (updatedPlayDate, playDateId) => {
    console.log("in update playdate in dogbuddy");
    // do axios patch request or
    // would it be a put?
    axios
      .patch(`http://localhost:8080/playDates/${playDateId}`, updatedPlayDate)
      .then(response => {
        console.log("update playdate successful");
        let updatedData = this.state.playDates;
        updatedData.push(updatedPlayDate);
        this.setState({ playDates: updatedData });
      })
      .catch(error => {
        console.log("update playdate not successful");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  addPlayDate = (newPlayDate, recieverId) => {
    console.log("in add playdate in dogbuddy");
    newPlayDate.requestor = `/persons/${
      this.state.currentUserObject.resourceId
    }`;

    newPlayDate.receiver = `/persons/${recieverId}`;
    newPlayDate.status = "Pending";

    console.log(newPlayDate);

    axios
      .post("http://localhost:8080/playDates", newPlayDate)
      .then(response => {
        console.log("response of addplaydate, successful?");
        console.log(response);
        let updatedData = this.state.playDates;
        updatedData.push(newPlayDate);
        this.setState({ playDates: updatedData });
        this.loadPlaydates();
      })
      .catch(error => {
        console.log("error with adding playdate");
        console.log(error.message);
        this.setState({ alertMessage: error.message });
      });
  };

  removePlayDate = playDateId => {
    console.log("in remove playdate in dogbuddy");
    // loop through playDates
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request for playdate
    // reload all playdates to update requestor/receiver sides
    axios
      .delete(`http://localhost:8080/playDates/${playDateId}`)
      .then(response => {
        console.log("remove playdate successful?");
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
        console.log("remove playdate not successful");
        console.log(error.message);
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
              addPlayDateCallback={this.addPlayDate}
              editDogCallback={this.updateDog}
              isLoggedIn={this.state.isLoggedIn}
              currentUserObject={this.state.currentUserObject}
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

  // call during login
  // will update profile created from false
  // to true if one exists
  // and will add the current user object to state
  // will load current user's dogs/playdates and
  // will pass those to the dashboard
  findByUid(uid) {
    axios
      .get(`http://localhost:8080/persons/search/findByUid?uid=${uid}`)
      .then(response => {
        // If successful, update profile created

        if (
          response.status === 200 &&
          response.data._embedded.persons.length === 1
        ) {
          this.setState({
            profileCreated: true,
            currentUserObject: response.data._embedded.persons[0]
          });
          console.log(this.state.currentUserObject);
          // TODO TODO
          // Load the dogs for the current person
          // Load requested playdates for the current person
          // Load received playdates for the current person
          // pass them to dashboard
          this.loadUsersDogs(this.state.currentUserObject.resourceId);
          this.loadUsersRecievedPlayDates(
            this.state.currentUserObject.resourceId
          );
          this.loadUsersRequestedPlayDates(
            this.state.currentUserObject.resourceId
          );
        } else {
          console.log("don't update profile created to true");
          this.setState({
            redirecToCreateProfile: true
          });
        }
        if (response.status === 404) {
          console.log("uid not found");
          // this.setState({
          //   profileCreated: false
          // });
        }
      })
      .catch(error => {
        console.log("find by uid not successful");
        console.log(error.message);
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
                location={playDate.location}
                details={playDate.details}
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
    this.loadPlaydates();

    // FIREBASE DATABASE

    // remember people that have logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          uid: user.uid,
          isLoggedIn: true
        });
        //TODO  Search for profile created based on uid
        // this will update the profileCreated to true
        // if it's successful
        this.findByUid(user.uid);
        this.loadDogs();
      }
    });
  }

  login = () => {
    // handles the callback for us
    auth
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.setState({
          user: user,
          uid: user.uid,
          isLoggedIn: true
        });
        //TODO  Search for profile created based on uid
        // this will update the profileCreated to true
        // if it's successful
        this.findByUid(user.uid);
        this.loadDogs();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  returnUser = () => {
    return this.state.user;
  };

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
        isLoggedIn: false,
        profileCreated: false,
        uid: null,
        currentUserObject: null
      });
      // QUESTION do i need to manually
      // reload the dogs ?
      //this.loadDogs();
    });
  };

  render() {
    const { redirect } = this.state.redirecToCreateProfile;
    return (
      //<section>
      <Router>
        <div>
          <nav id="router-list">
            <Link to="/">Login/Sign Up</Link>
            <Link to="/createProfile">Create Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dogs">View Dogs</Link>
            <Link to="/users">View Users</Link>
            <Link to="search">Search</Link>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                this.state.isLoggedIn && this.state.profileCreated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/login" />
                )
              }
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
            <Route
              path="/createProfile"
              render={() => (
                <CreateProfile
                  uid={this.state.uid}
                  addPersonCallback={this.addPerson}
                />
              )}
            />
            <Route
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
              path="/dashboard"
              render={() => (
                <Dashboard
                  isLoggedIn={this.state.isLoggedIn}
                  profileCreated={this.state.profileCreated}
                  user={this.state.user}
                  currentUserObject={this.state.currentUserObject}
                  persons={this.state.persons}
                  addDogCallback={this.addDog}
                  removeDogCallback={this.removeDog}
                  editDogCallback={this.updateDog}
                  editPersonCallback={this.updateUser}
                  addPlayDateCallback={this.addPlayDate}
                  editPlayDateCallback={this.updatePlayDate}
                  currentUserDogs={this.state.currentUserDogs}
                  currentUserReceivedPlayDates={
                    this.state.currentUserReceivedPlayDates
                  }
                  currentUserRequestedPlayDates={
                    this.state.currentUserRequestedPlayDates
                  }
                />
              )}
            />
            <Route
              path="/dogs"
              render={() => (
                <DogCollection
                  dogComponentsCollection={this.state.dogs}
                  addPlayDateCallback={this.addPlaydate}
                />
              )}
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
            />
            <Route
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
            <Route
              path="/search"
              component={Search}
              isLoggedIn={this.state.isLoggedIn}
              profileCreated={this.state.profileCreated}
            />
          </Switch>
        </div>
      </Router>
    );
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
