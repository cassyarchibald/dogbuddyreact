import React, { Component } from "react";
import "./NewPlayDateForm.css";
import PropTypes from "prop-types";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import axios from "axios";
import Dog from "./Dog";

// TODO Would be nice if the playdate form would
// automatically add the requestor (current logged in user)
// and the reciever (owner of the dog)
// might have to wait for dashboard/login logic

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
      requestorDogName: null,
      recievingDogName: this.props.recievingDogName,
      currentUserObject: this.props.currentUserObject,
      errorMessages: [],
      currentUserDogs: null,
      currentUserdogNames: null
    };
    console.log(this.props.reciever.props.id);
  }

  onInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState({ newState });
  };

  // onRequestorDogChange = event => {
  //   console.log("updating requestor dog in state");
  //   const value = event.target.value;
  //   console.log(value);
  //   this.setState({ requestorDogName: value });
  //   console.log(this.state);
  // };

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
    // console.log("loading user dogs");
    // console.log(this.state.currentUserObject);
    axios
      .get(
        `http://localhost:8080/persons/${
          this.props.currentUserObject.resourceId
        }/dogs`
      )
      .then(response => {
        console.log("loading dogs from response");
        // console.log(response.data);
        const dogNames = response.data._embedded.dogs.map(dog => {
          // console.log("value of user in loading dogs");
          // console.log(this.state.user);
          // console.log(this.props);
          return (
            <option value={dog.name} key={dog.id}>
              {dog.name}
            </option>
          );
        });

        this.setState({
          currentUserdogNames: dogNames
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  componentDidMount() {
    if (this.props.currentUserObject) {
      this.loadPersonsDogs();
    } else {
      console.log("not current user object in state");
      console.log(this.state);
    }
  }

  onFormSubmit = event => {
    event.preventDefault();

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
      recievingDogName
    } = this.state;

    if (
      startTime === "" ||
      endTime === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      requestorDogName === "" ||
      requestorDogName === null
    )
      return;

    const newPlayDate = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      location: this.state.location,
      details: this.state.details,
      reciever: this.props.reciever,
      requestorDogName: this.state.requestorDogName,
      recievingDogName: this.state.recievingDogName,
      dogNames: []
    };
    console.log("submitting form");
    console.log(newPlayDate);
    let recieverId = this.props.reciever.props.id;
    //console.log(this.props.reciever.id);
    //console.log(this.state);
    //newPlayDate.reciever = this.props.reciever;
    // Need to add the requestor/reciever, add playdate to parent state/do post request?
    this.props.addPlayDateCallback(
      newPlayDate,
      recieverId
      // requestorDogName,
      // recieverDogName
    );
    this.resetState();
  };

  render() {
    const errorMessages = this.state.errorMessages.map(message => {
      return <li>{message}</li>;
    });

    return (
      <div>
        <section className="errors">
          <ul>{errorMessages}</ul>
        </section>
        <form className="form-group" onSubmit={this.onFormSubmit}>
          <p>Playdate request for {this.props.recieverDogName} to play with </p>
          <div>
            <select name="requestorDogName" onChange={this.onInputChange}>
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
              value={this.state.startTime}
              className="form-control"
              type="datetime-local"
              name="startTime"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              value={this.state.endTime}
              className="form-control"
              type="datetime-local"
              name="endTime"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              value={this.state.city}
              className="form-control"
              name="city"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              value={this.state.state}
              className="form-control"
              name="state"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              value={this.state.zipCode}
              className="form-control"
              name="zipCode"
              type="number"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              className="form-control"
              name="location"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="details">Details</label>
            <input
              className="form-control"
              name="details"
              type="textarea"
              onChange={this.onInputChange}
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
