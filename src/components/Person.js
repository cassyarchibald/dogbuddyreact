import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Person.css";
import axios from "axios";
import Dog from "./Dog";
import PlayDate from "./PlayDate";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
      firstName: props.firstName,
      lastName: props.lastName,
      city: props.city,
      state: props.state,
      zipCode: props.zipCode,
      about: props.about,
      photo: props.photo,
      addPersonCallback: this.props.addPersonCallback,
      dogLink: props.dogLink,
      dogs: [],
      requestedPlayDates: [],
      recievedPlayDates: [],
      errorMessages: [],
      showDogs: false
    };
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  // Make loadPlaydates method
  loadRequestedPlayDates() {
    axios
      .get(this.state.requestedPlayDatesLink)
      .then(response => {
        const requestedPlayDateComponents = response.data._embedded.playDates.map(
          playDate => {
            return (
              // Add requestor person/dog, requestee person/dog?
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
          requestedPlayDates: requestedPlayDateComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  // Make loadPlaydates method
  loadRecievedPlayDates() {
    axios
      .get(this.state.recievedPlayDatesLink)
      .then(response => {
        const recievedPlayDateComponents = response.data._embedded.playDates.map(
          playDate => {
            return (
              // Add requestor person/dog, requestee person/dog?
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
          recievedPlayDates: recievedPlayDateComponents
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  loadDogs() {
    axios
      .get(this.state.dogLink)
      .then(response => {
        const dogComponents = response.data._embedded.dogs.map(dog => {
          return (
            <Dog
              key={`${dog.name}${dog.resourceId}`}
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
    this.loadRecievedPlayDates();
    this.loadRequestedPlayDates();
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
  uid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string,
  addPersonCallback: PropTypes.func
  // dogs here
  // playdates here ?
};

export default Person;
