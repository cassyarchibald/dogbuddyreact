import React, { Component } from "react";
import "./NewPlayDateForm.css";
import PropTypes from "prop-types";

// TODO Would be nice if the playdate form would
// automatically add the requestor (current logged in user)
// and the receiver (owner of the dog)
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
      requestor: "",
      receiver: this.props.receiver,
      errorMessages: []
    };
  }
  onInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
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
      receiver: ""
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      startTime,
      endTime,
      city,
      state,
      zipCode,
      location,
      details
    } = this.state;

    if (
      startTime === "" ||
      endTime === "" ||
      city === "" ||
      state === "" ||
      zipCode === ""
    )
      return;

    const newPlayDate = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      location: this.state.location,
      details: this.state.details
    };

    console.log(this.props);
    // Need to add the requestor/receiver, add playdate to parent state/do post request?
    this.props.addPlayDateCallback(newPlayDate, this.state);
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
              value="Seattle"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              value={this.state.state}
              className="form-control"
              name="state"
              value="Washington"
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
            <label htmlFor="location">Location</label>
            <input
              value={this.state.location}
              className="form-control"
              name="location"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="details">Details</label>
            <input
              value={this.state.details}
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
      // <div>
      //   <label htmlFor="status">Status</label>
      //   <input
      //     value={this.state.status}
      //     name="status"
      //     className="form-control"
      //     onChange={this.onInputChange}
      //   />
      // </div>

      // <div>
      //   <label htmlFor="receiver">Sent Request To</label>
      //   <input
      //     value={
      //       this.state.receiver.props.firstName +
      //       " " +
      //       this.state.receiver.props.lastName
      //     }
      //     className="form-control"
      //     name="receiver"
      //     onChange={this.onInputChange}
      //   />
      // </div>
    );
  }
}

NewPlayDateForm.propTypes = {
  addPlayDateCallback: PropTypes.func
};

export default NewPlayDateForm;
