import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";
import axios from "axios";
import { RadioGroup, RadioButton } from "react-radio-buttons";

class PlayDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      city: this.props.city,
      state: this.props.state,
      zipCode: this.props.zipCode,
      status: this.props.status,
      location: this.props.location,
      details: this.props.details,
      requestorDogName: this.props.requestorDogName,
      recievingDogName: this.props.recievingDogName,
      recieverObject: null,
      requestorObject: null,
      alertMessage: []
    };
    console.log(props);
  }

  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  loadPlayDateRequestor() {
    axios
      .get(this.props.loadPlayDateRequestorLink.href)
      .then(response => {
        this.setState({
          requestorObject: response.data
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  loadPlayDateReciever() {
    axios
      .get(this.props.loadPlayDateRecieverLink.href)
      .then(response => {
        this.setState({
          recieverObject: response.data
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
        console.log(error.message);
      });
  }

  componentDidMount() {
    console.log("playdate did mount");
    // load requestor name and reciever name
    this.loadPlayDateRequestor();
    this.loadPlayDateReciever();
    // console.log(this.props);
    // console.log(this.state);
  }

  render() {
    return (
      <div className="card d-inline-block">
        <h4 duration={5000} className="alertMessage text-center">
          {this.state.alertMessage}
        </h4>
        <p>
          {this.state.recieverObject
            ? ` To: ${this.state.recieverObject.firstName} ${
                this.state.recieverObject.lastName
              }`
            : null}
          {this.state.recievingDogName
            ? ` and ${this.state.recievingDogName}`
            : null}
        </p>
        <p>
          {this.state.requestorObject
            ? `From: ${this.state.requestorObject.firstName} ${
                this.state.requestorObject.lastName
              }`
            : null}
          {this.state.requestorDogName
            ? ` and ${this.state.requestorDogName}`
            : null}
        </p>
        <p>Start Time: {this.state.startTime}</p>
        <p>End Time: {this.state.endTime}</p>
        <p>City: {this.state.city}</p>
        <p>State: {this.state.state}</p>
        <p>Zip Code: {this.state.zipCode}</p>
        <p>Location: {this.state.location}</p>
        <p>Details: {this.state.details}</p>
        <p>Status: {this.state.status}</p>
        {this.props.showStatusChangeButton ? (
          <h1>Show Update Status Button</h1>
        ) : null}
      </div>
    );
  }
}

PlayDate.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  status: PropTypes.string,
  details: PropTypes.string,
  location: PropTypes.string,
  addPlayDateCallback: PropTypes.func
  // requestor here
  // responder here
};

export default PlayDate;
