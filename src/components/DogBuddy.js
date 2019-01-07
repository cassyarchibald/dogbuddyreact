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
      persons: [],
      dogs: [],
      playDates: [],
      alertMessage: ""
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  // TODO - Untested - need to know owner id to add to
  // new dog form/post to /persons/${personId}/dogs
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
  // componentDidMount method that loads the users/dogs/playdates
  componentDidMount() {
    // API request to load users
    this.loadUsers();
    // API request to load dogs
    this.loadDogs();
    // API request to load playdates
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
            <ul id="router-list">
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
              render={() => (
                <PersonCollection
                  persons={this.state.persons}
                  addPersonCallback={this.state.addPerson}
                />
              )}
            />
            <Route
              path="/dogs"
              render={() => (
                <DogCollection
                  dogComponentsCollection={this.state.dogs}
                  addDogCallback={this.addDog}
                />
              )}
            />
            <Route
              path="/addPerson"
              render={() => (
                <NewPersonForm addPersonCallback={this.addPerson} />
              )}
            />
            <Route
              path="/addDog"
              render={() => <NewDogForm addDogCallback={this.addDog} />}
            />
            <Route
              path="/addPlayDate"
              render={() => (
                <NewPlayDateForm addPlayDateCallback={this.addPlayDate} />
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
