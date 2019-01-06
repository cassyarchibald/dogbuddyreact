import React, { Component } from "react";
import "./NewPlayDateForm.css";

class NewPlayDateForm extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      startTime: "",
      endTime: "",
      city: "",
      state: "",
      zipCode: "",
      status: "",
      requestor: "",
      receiver: "",
      errorMessages: []
    };
  }
  onInputChange = event => {
    console.log("In on input change");

    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
  };

  resetState = () => {
    this.setState({
      date: "",
      startTime: "",
      endTime: "",
      city: "",
      state: "",
      zipCode: "",
      status: "",
      requestor: "",
      receiver: ""
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      date,
      startTime,
      endTime,
      city,
      state,
      zipCode,
      status,
      requestor,
      receiver
    } = this.state;

    if (
      date === "" ||
      startTime === "" ||
      endTime === "" ||
      city === "" ||
      state === "" ||
      zipCode === ""
    )
      return;

    const newDog = {
      name: this.state.name,
      age: this.state.age,
      size: this.state.size,
      vaccinated: this.state.vaccinated,
      about: this.state.about,
      photo: this.state.photo,
      breed: this.state.breed,
      preferredPlayBuddy: this.state.preferredPlayBuddy
    };

    // Need to add the user, post request?
    this.props.addDogCallback(newDog, this.state);
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
          <div>
            <label htmlFor="name">Date</label>
            <input
              value={this.state.date}
              className="form-control"
              name="date"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              value={this.state.startTime}
              className="form-control"
              name="startTime"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              value={this.state.endTime}
              className="form-control"
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
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <input
              value={this.state.status}
              name="status"
              className="form-control"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="receiver">Sent Request To</label>
            <input
              value={this.state.receiver}
              className="form-control"
              name="receiver"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="requestor">Request From</label>
            <input
              value={this.state.requestor}
              className="form-control"
              name="reque."
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

export default NewPlayDateForm;
