import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";
class PlayDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.startTime,
      endTime: this.props.endtime,
      city: this.props.city,
      state: this.props.state,
      zipCode: this.props.zipCode,
      status: this.props.status,
      location: this.props.location,
      details: this.props.details,
      reciever: null,
      requesto: null
    };
  }
  render() {
    return (
      <div className="card d-inline-block">
        <p>Reciever: {this.state.reciever}</p>
        <p>Requestor: {this.state.requestor}</p>
        <p>Start Time: {this.state.startTime}</p>
        <p>End Time: {this.state.endTime}</p>
        <p>City: {this.state.city}</p>
        <p>State: {this.state.state}</p>
        <p>Zip Code: {this.state.zipCode}</p>
        <p>Location: {this.state.location}</p>
        <p>Details: {this.state.details}</p>
        <p>Status: {this.state.status}</p>
      </div>
    );
  }
}

PlayDate.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  status: PropTypes.string,
  details: PropTypes.string,
  location: PropTypes.string,
  addPlayDateCallback: PropTypes.addPlayDateCallback
  // requestor here
  // responder here
};

export default PlayDate;
