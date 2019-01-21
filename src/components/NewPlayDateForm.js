import React, { Component } from "react";
import "./NewPlayDateForm.css";
import PropTypes from "prop-types";
import axios from "axios";

let requestorDog = "";
let requestorDogImage = null;

class NewPlayDateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
      city: "",
      state: "",
      zipCode: "",
      status: "",
      location: "",
      details: "",
      reciever: this.props.reciever,
      requestor: this.props.requestor,
      requestorDogName: requestorDog,
      recievingDogName: this.props.recievingDogName,
      currentUserObject: this.props.currentUserObject,
      currentUserDogs: null,
      requestorDogImage: null,
      errorMessages: [],
      currentUserDogs: null,
      currentUserdogNames: null
    };
  }

  onInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[field] = value;
    this.setState(newState);
  };

  onRequestorDogChange = event => {
    requestorDog = event.target.value;
  };

  resetState = () => {
    this.setState({
      startTime: "",
      endTime: "",
      city: "",
      state: "",
      zipCode: "",
      status: "",
      requestor: "",
      reciever: "",
      location: "",
      details: "",
      requestorDogName: "",
      recievingDogName: ""
    });
  };

  loadPersonsDogs() {
    axios
      .get(
        `https://dogbuddyapi.herokuapp.com/persons/${
          this.props.currentUserObject.resourceId
        }/dogs`
      )
      .then(response => {
        console.log("loading dogs from response");
        const dogNames = response.data._embedded.dogs.map(dog => {
          return (
            <option value={dog.name} key={`${dog.name}${dog.id}`}>
              {dog.name}
            </option>
          );
        });

        this.setState({
          currentUserdogNames: dogNames,
          currentUserDogs: response.data._embedded.dogs
        });
        console.log(this.state.currentUserDogs);
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  componentDidMount() {
    if (this.props.currentUserObject) {
      this.loadPersonsDogs();
    } else {
      this.changeMessage("There is no user logged in");
    }
  }

  onFormSubmit = event => {
    event.preventDefault();
    console.log("inside form submit");
    const {
      startTime,
      endTime,
      city,
      state,
      zipCode,
      location,
      details,
      reciever,
      requestor,
      requestorDogName,
      recievingDogName,
      recievingDogImage
    } = this.state;

    if (
      startTime === "" ||
      endTime === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      requestorDog === "" ||
      requestorDog === "Select A Dog"
    ) {
      this.setState({ errorMessages: "field is blank or invalid" });
      console.log("something is blank");
      return;
    }

    // getting requestor dog image
    {
      requestorDog &&
        this.state.currentUserDogs.forEach(function(dog) {
          if (dog.name === requestorDog) {
            requestorDogImage = dog.photo;
          }
        });
    }

    const newPlayDate = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      location: this.state.location,
      details: this.state.details,
      reciever: this.props.reciever,
      requestorDogName: requestorDog,
      recievingDogName: this.state.recievingDogName,
      receivingDogPhoto: this.state.recievingDogImage,
      requestorDogPhoto: requestorDogImage,
      dogNames: []
    };
    console.log(newPlayDate);
    let recieverId = this.props.reciever.props.id;

    this.props.addPlayDateCallback(newPlayDate, recieverId, requestorDogName);
    this.resetState();
  };

  render() {
    return (
      <div>
        <section className="errors" />
        <form className="form-group" onSubmit={this.onFormSubmit}>
          <p>Playdate request for {this.props.recieverDogName} to play with </p>
          <div>
            <select
              name="requestorDogName"
              onChange={this.onRequestorDogChange}
            >
              <option value="" disables="true">
                Select Dog
              </option>
              {this.state.currentUserdogNames
                ? this.state.currentUserdogNames
                : null}
            </select>
            <br />
            <label htmlFor="startTime">Start Time</label>
            <input
              className="form-control"
              type="datetime-local"
              name="startTime"
              onChange={this.onInputChange}
              value={this.state.startTime}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              className="form-control"
              type="datetime-local"
              name="endTime"
              onChange={this.onInputChange}
              value={this.state.endTime}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              className="form-control"
              name="city"
              onChange={this.onInputChange}
              value={this.state.city}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              className="form-control"
              name="state"
              onChange={this.onInputChange}
              value={this.state.state}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              className="form-control"
              name="zipCode"
              type="number"
              onChange={this.onInputChange}
              value={this.state.zipCode}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              className="form-control"
              name="location"
              onChange={this.onInputChange}
              value={this.state.location}
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="details">Details</label>
            <input
              className="form-control"
              name="details"
              type="textarea"
              rows="3"
              onChange={this.onInputChange}
              value={this.state.details}
            />
          </div>
          <input
            type="submit"
            value="Send Playdate Request"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}

NewPlayDateForm.propTypes = {
  addPlayDateCallback: PropTypes.func
};

export default NewPlayDateForm;
