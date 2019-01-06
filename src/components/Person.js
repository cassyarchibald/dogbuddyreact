import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Person.css";
import axios from "axios";
import Dog from "./Dog";
import DogCollection from "./DogCollection";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      city: props.city,
      state: props.state,
      zipCode: props.zipCode,
      about: props.about,
      photo: props.photo,
      addUserCallback: props.addUserCallback,
      dogLink: props.dogLink,
      dogs: [],
      errorMessages: [],
      showDogs: false
    };
  }

  // Might not need this...
  loadDogs() {
    axios
      .get(this.state.dogLink)
      .then(response => {
        const dogComponents = response.data._embedded.dogs.map(dog => {
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
              personLink={dog._links.person.href}
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

  componentDidMount() {
    this.loadDogs();
  }

  showDogs = () => {
    this.setState({
      showDogs: !this.state.showDogs
    });
  };

  render() {
    return (
      <div className="card d-inline-block">
        <h3 className="text-center" id="person-name">
          {this.state.firstName} {this.state.lastName}
        </h3>
        <p>City: {this.state.city}</p>
        <p>State: {this.state.state}</p>
        <p>Zip Code: {this.state.zipCode}</p>
        <p>About: {this.state.about}</p>
      </div>
    );
  }
}

Person.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string,
  addUserCallback: PropTypes.func
  // dogs here
  // playdates here ?
};

export default Person;
