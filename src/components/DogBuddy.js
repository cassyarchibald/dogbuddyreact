import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from "react-router-dom";
// import AllRoutes from "./AllRoutes";
// import ProtectedRoute from "./ProtectedRoute";
import PropTypes from "prop-types";
import "./DogBuddy.css";
import Login from "./Login";
import Person from "./Person";
import PersonCollection from "./PersonCollection";
import CreateProfile from "./CreateProfile";
import PlayDate from "./PlayDate";
// import PlayDateCollection from "./PlayDateCollection";
// import NewPlayDateForm from "./NewPlayDateForm";
import Dashboard from "./Dashboard";
import Dog from "./Dog";
import DogCollection from "./DogCollection";
// import NewDogForm from "./NewDogForm";
import axios from "axios";
import Search from "./Search";
import Welcome from "./Welcome";
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
      currentUserRecievedPlayDates: null,
      redirecToCreateProfile: false
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  // ***************** DOGS *****************
  // new dog form/post to /persons/${personId}/dogs
  addDog = newDog => {
    // console.log("in add dog in dogbuddy");
    // console.log(this.state.currentUserObject);
    newDog.person = `/persons/${this.state.currentUserObject.resourceId}`;
    // update string boolean to actual boolean before post
    if (newDog.vaccinated === "true") {
      newDog.vaccinated = true;
    } else {
      newDog.vaccinated = false;
    }

    axios
      .post(`https://dogbuddyapi.herokuapp.com/dogs/`, newDog)
      .then(response => {
        console.log("adding dog success");
        let updatedData = this.state.dogs;
        updatedData.push(newDog);
        console.log(newDog);

        this.setState({ dogs: updatedData });

        this.loadPersonsDogs();
        this.loadPersons();
      })
      .catch(error => {
        console.log("adding dog failure");
        console.log(newDog);
        this.changeMessage(error.message);
        console.log(error.message);
      });
  };

  updateDog = (updatedDog, dogId) => {
    console.log("in update dog in dogbuddy");
    // do axios patch request or
    // would it be a put?
    axios
      .put(`https://dogbuddyapi.herokuapp.com/dogs/${dogId}`, updatedDog)
      .then(response => {
        console.log("update dog successful");
        let updatedData = this.state.dogs;
        updatedData.push(updatedDog);
        this.setState({ dogs: updatedData });
        console.log(this.state.dogs);
        // reloading person's dogs
        // so dogs passed to dashboard via props
        // will be updated
        this.loadPersonsDogs();
        this.loadDogs();
      })
      .catch(error => {
        console.log("update dog not successful");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  removeDog = dogId => {
    console.log("in remove dog from dogbuddy");

    // do delete axios request
    axios
      .delete(`https://dogbuddyapi.herokuapp.com/dogs/${dogId}`)
      .then(response => {
        console.log("remove dog successful?");
        this.loadDogs();
        this.loadPersonsDogs();
      })
      .catch(error => {
        console.log("remove dog not successful");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  //load dogs axios get method saved as loadDogs
  loadDogs() {
    axios
      .get("https://dogbuddyapi.herokuapp.com/dogs")
      .then(response => {
        const dogComponents = response.data._embedded.dogs.map(dog => {
          return (
            <Dog
              addPlayDateCallback={this.addPlayDate}
              editDogCallback={this.updateDog}
              removeDogCallback={this.removeDog}
              isLoggedIn={this.state.isLoggedIn}
              zipCode={null}
              currentUserObject={this.state.currentUserObject}
              key={`${dog.name}${dog.resourceId}`}
              id={dog.resourceId}
              name={dog.name}
              age={dog.age}
              size={dog.size}
              gender={dog.gender}
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

  // ***************** Person *****************
  // occures after CreateProfile form is submitted
  // if successful, update persons/profileCreated
  addPerson = newPerson => {
    console.log("in add person in dogbuddy");
    newPerson.uid = this.state.uid;
    axios
      .post("https://dogbuddyapi.herokuapp.com/persons", newPerson)
      .then(response => {
        console.log(response);
        console.log("Added person");
        let updatedData = this.state.persons;
        updatedData.push(newPerson);
        this.setState({ persons: updatedData, profileCreated: true });
        this.loadPersons();
      })
      .catch(error => {
        console.log("did not add person");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  // Not being used currently
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
      .delete(`https://dogbuddyapi.herokuapp.com/persons/${personId}`)
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
        this.changeMessage(error.message);
      });
  };

  loadPersons() {
    axios
      .get("https://dogbuddyapi.herokuapp.com/persons")
      .then(response => {
        const PersonComponenets = response.data._embedded.persons.map(
          person => {
            return (
              <Person
                key={`${person.firstName}${person.resourceId}`}
                id={person.resourceId}
                firstName={person.firstName}
                lastName={person.lastName}
                city={person.city}
                state={person.state}
                zipCode={person.zipCode}
                about={person.about}
                photo={person.photo}
                dogLink={person._links.dogs.href}
                recievedPlayDatesLink={person._links.recievedPlaydates.href}
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
    console.log(uid);
    axios
      .get(
        `https://dogbuddyapi.herokuapp.com/persons/search/findByUid?uid=${uid}`
      )
      .then(response => {
        // If successful, update profile created
        console.log(response);

        if (
          response.status === 200 &&
          response.data._embedded.persons.length > 0
        ) {
          this.setState({
            profileCreated: true,
            currentUserObject: response.data._embedded.persons[0]
          });
          console.log(this.state.currentUserObject);
          // Load the dogs for the current person
          // Load requested playdates for the current person
          // Load recieved playdates for the current person
          // pass them to dashboard
          console.log("loading dogs/playdates for person");
          console.log(response.data._embedded.persons[0]);
          this.loadPersonsDogs();
          this.loadDogs();
          this.loadPersonsRecievedPlayDates(
            this.state.currentUserObject.resourceId
          );
          this.loadPersonsRequestedPlayDates(
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
        this.changeMessage(error.message);
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
        this.changeMessage(error.message);
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

  loadPersonsDogs() {
    console.log(this.state.currentUserObject);

    axios
      .get(
        `https://dogbuddyapi.herokuapp.com/persons/${
          this.state.currentUserObject.resourceId
        }/dogs`
      )
      .then(response => {
        console.log("loading person's dogs from response");
        // console.log(response.data);
        const dogComponents = response.data._embedded.dogs.map(dog => {
          // console.log("value of user in loading dogs");
          // console.log(this.state.user);
          // console.log(this.props);
          return (
            <Dog
              user={this.state.currentUserObject}
              key={`${dog.name}${dog.resourceId}`}
              currentUserObject={this.state.currentUserObject}
              id={dog.resourceId}
              name={dog.name}
              age={dog.age}
              size={dog.size}
              gender={dog.gender}
              vaccinated={dog.vaccinated}
              about={dog.about}
              photo={dog.photo}
              breed={dog.breed}
              ownerLink={dog._links.person.href}
              preferredPlayBuddy={dog.preferredPlayBuddy}
              addPlayDateCallback={this.props.addPlayDateCallback}
              showEditDelete={true}
              editDogCallback={this.updateDog}
              removeDogCallback={this.removeDog}
            />
          );
        });
        console.log(dogComponents);

        this.setState({
          currentUserDogs: dogComponents
        });
        //console.log(this.state.currentUserDogs);
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log("could not load perons's dogs");
        console.log(error.message);
      });
  }

  loadPersonsRequestedPlayDates(personId) {
    console.log("loading users requested playdates");
    axios
      .get(
        `https://dogbuddyapi.herokuapp.com/persons/${personId}/requestedPlaydates`
      )
      .then(response => {
        console.log("success loading users requested playdates");
        console.log(response.data);
        console.log(personId);
        const requestedPlayDatesComponents = response.data._embedded.playDates.map(
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
                addPlayDateCallback={this.addPlayDate}
                editPlayDateCallback={this.updatePlayDate}
                loadPlayDateRequestorLink={playDate._links.requestor}
                loadPlayDateRecieverLink={playDate._links.reciever}
                requestorDogName={playDate.requestorDogName}
                recievingDogName={playDate.recievingDogName}
              />
            );
          }
        );
        // console.log("requestedPlayDatesComponents");
        // console.log(requestedPlayDatesComponents);
        this.setState({
          currentUserRequestedPlayDates: requestedPlayDatesComponents
        });
        console.log(this.state.currentUserRequestedPlayDates);
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  loadPersonsRecievedPlayDates(personId) {
    console.log("loading recieved playdates");
    //console.log(`https://dogbuddyapi.herokuapp.com/persons/${personId}/recievedPlaydates`);
    axios
      .get(
        `https://dogbuddyapi.herokuapp.com/persons/${personId}/recievedPlaydates`
      )
      .then(response => {
        console.log("success loading recieved playdates?");
        console.log(response);
        const recievedPlayDatesComponents = response.data._embedded.playDates.map(
          playDate => {
            //console.log(playDate);
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
                loadPlayDateRequestorLink={playDate._links.requestor}
                loadPlayDateRecieverLink={playDate._links.reciever}
                requestorDogName={playDate.requestorDogName}
                recievingDogName={playDate.recievingDogName}
                showStatusChangeButton={true}
              />
            );
          }
        );
        // console.log(recievedPlayDatesComponents);

        this.setState({
          currentUserRecievedPlayDates: recievedPlayDatesComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  updatePerson = updatedPerson => {
    updatedPerson.resourceId = this.state.currentUserObject.resourceId;
    console.log("in update person in dog buddy");
    console.log(updatedPerson);
    console.log(this.state.currentUserObject);
    // do axios patch request or
    // would it be a put?
    axios
      .put(
        `https://dogbuddyapi.herokuapp.com/persons/${
          this.state.currentUserObject.resourceId
        }`,
        updatedPerson
      )
      .then(response => {
        console.log("successful update of person");
        let updatedData = this.state.persons;
        updatedData.push(updatedPerson);
        this.setState({ persons: updatedData });
        // update current user in state
        console.log(updatedPerson);
        console.log("updating current user object with updated person");
        this.setState({
          currentUserObject: updatedPerson
        });
        // reloading people
        this.loadPersons();
      })
      .catch(error => {
        console.log("unable to update person");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  // ***************** PLAYDATES *****************

  addPlayDate = (newPlayDate, recieverId, requestorDogName) => {
    // time is correct here ex. 1pm to 2pm is T13:00 and T14:00
    console.log("in add playdate in dogbuddy");
    console.log(newPlayDate.startTime);
    console.log(newPlayDate.endTime);

    newPlayDate.requestor = `/persons/${
      this.state.currentUserObject.resourceId
    }`;

    newPlayDate.reciever = `/persons/${recieverId}`;
    newPlayDate.status = "Pending";
    // during post the value changes to 8:00 for time?
    axios
      .post("https://dogbuddyapi.herokuapp.com/playDates", newPlayDate)
      .then(response => {
        let updatedData = this.state.playDates;
        updatedData.push(newPlayDate);
        this.setState({ playDates: updatedData });
        this.loadPlaydates();
        this.loadPersonsRequestedPlayDates(
          this.state.currentUserObject.resourceId
        );
      })
      .catch(error => {
        console.log("error with adding playdate");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  updatePlayDate = (updatedPlayDate, playDateId) => {
    console.log("in update playdate in dogbuddy");
    axios
      .put(
        `https://dogbuddyapi.herokuapp.com/playDates/${playDateId}`,
        updatedPlayDate
      )
      .then(response => {
        console.log("update playdate successful");
        let updatedData = this.state.playDates;
        updatedData.push(updatedPlayDate);
        this.setState({ playDates: updatedData });
      })
      .catch(error => {
        console.log("update playdate not successful");
        console.log(error.message);
        this.changeMessage(error.message);
      });
  };

  removePlayDate = playDateId => {
    console.log("in remove playdate in dogbuddy");
    // loop through playDates
    // if id matches, set delete index to that index
    // splice that index out
    // update the state to equal the new value
    // do delete axios request for playdate
    // reload all playdates to update requestor/reciever sides
    axios
      .delete(`https://dogbuddyapi.herokuapp.com/playDates/${playDateId}`)
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
        this.changeMessage(error.message);
      });
  };

  // load playdates axios get method saved as loadMessages
  // TODO - Change this to update the current user's requested playdates instead
  loadPlaydates() {
    axios
      .get("https://dogbuddyapi.herokuapp.com/playDates")
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
                requestorDogName={playDate.requestorDogName}
                recievingDogName={playDate.recievingDogName}
                editPlayDateCallback={this.updatePlayDate}
                loadPlayDateRequestorLink={playDate._links.requestor}
                loadPlayDateRecieverLink={playDate._links.reciever}
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
    this.loadPersons();
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

  render() {
    const { redirect } = this.state.redirecToCreateProfile;
    const isAuthenticated = this.state.isLoggedIn && this.state.profileCreated;
    //console.log(isAuthenticated);
    return (
      //<section>
      <Router>
        <div>
          <nav id="router-list" className="app-nav">
            <Link
              to="/login"
              onClick={() => {
                this.state.isLoggedIn && this.logout();
              }}
            >
              {this.state.isLoggedIn ? "Logout" : "Login"}
            </Link>
            {this.state.profileCreated === false && (
              <Link to="/createProfile">Create Profile</Link>
            )}

            <Link to="/home">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dogs">View Dogs</Link>
            <Link to="/users">View Users</Link>
            <Link to="search">Search</Link>
          </nav>
          <div className="App-header">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route exact path="/home" render={() => <Welcome />} />
              <Route
                path="/login"
                render={() =>
                  isAuthenticated ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Login
                      user={this.state.user}
                      loginCallback={this.login}
                      logoutCallback={this.logout}
                      isLoggedIn={this.state.isLoggedIn}
                      profileCreated={this.state.profileCreated}
                      uid={this.state.uid}
                      addPersonCallback={this.addPerson}
                    />
                  )
                }
              />
              <Route
                path="/createProfile"
                render={() =>
                  isAuthenticated ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <CreateProfile
                      uid={this.state.uid}
                      addPersonCallback={this.addPerson}
                    />
                  )
                }
              />
              <Route
                isLoggedIn={this.state.isLoggedIn}
                profileCreated={this.state.profileCreated}
                path="/dashboard"
                render={() =>
                  isAuthenticated === false ? (
                    <Redirect to="/login" />
                  ) : (
                    <Dashboard
                      isLoggedIn={this.state.isLoggedIn}
                      profileCreated={this.state.profileCreated}
                      user={this.state.user}
                      currentUserObject={this.state.currentUserObject}
                      persons={this.state.persons}
                      addDogCallback={this.addDog}
                      removeDogCallback={this.removeDog}
                      editDogCallback={this.updateDog}
                      editPersonCallback={this.updatePerson}
                      addPlayDateCallback={this.addPlayDate}
                      editPlayDateCallback={this.updatePlayDate}
                      currentUserDogs={this.state.currentUserDogs}
                      currentUserRecievedPlayDates={
                        this.state.currentUserRecievedPlayDates
                      }
                      currentUserRequestedPlayDates={
                        this.state.currentUserRequestedPlayDates
                      }
                    />
                  )
                }
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
                render={() =>
                  isAuthenticated === false ? (
                    <Redirect to="/login" />
                  ) : (
                    <PersonCollection
                      persons={this.state.persons}
                      addPersonCallback={this.state.addPerson}
                    />
                  )
                }
                isLoggedIn={this.state.isLoggedIn}
                profileCreated={this.state.profileCreated}
              />
              <Route
                path="/search"
                render={() => (
                  <Search
                    dogs={this.state.dogs}
                    isLoggedIn={this.state.isLoggedIn}
                    profileCreated={this.state.profileCreated}
                    addPlayDateCallback={this.addPlayDate}
                    currentUserObject={this.state.currentUserObject}
                  />
                )}
              />
            </Switch>
          </div>
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
  zipCode: PropTypes.string,
  status: PropTypes.string,
  // Person
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default DogBuddy;
