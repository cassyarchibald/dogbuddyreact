import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";
import axios from "axios";
//import { RadioGroup, RadioButton } from "react-radio-buttons";
import moment from "moment";

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
      });
  }

  statusColor = () => {
    if (this.state.status === "Pending") {
      return "Orange";
    } else if (this.state.status === "Denied") {
      return "Red";
    } else if (this.state.status === "Approved") return "Green";
  };

  componentDidMount() {
    // load requestor name and reciever name
    this.loadPlayDateRequestor();
    this.loadPlayDateReciever();
  }

  approvePlayDate = () => {
    this.setState({ status: "Approved" });
    this.props.editPlayDateCallback(this.state, this.props.id);
  };

  denyPlayDate = () => {
    this.setState({ status: "Denied" });
    this.props.editPlayDateCallback(this.state, this.props.id);
  };

  render() {
    return (
      <div className="col-sm-6 playDate">
        <div className="card">
          <h4 duration={5000} className="alertMessage text-center">
            {this.state.alertMessage}
          </h4>
          <p>
            <span>To</span>
            {this.state.recieverObject
              ? `${this.state.recieverObject.firstName} ${
                  this.state.recieverObject.lastName
                }`
              : null}
            {this.state.recievingDogName
              ? ` and ${this.state.recievingDogName}`
              : null}
          </p>
          <p>
            <span>From:</span>
            {this.state.requestorObject
              ? `${this.state.requestorObject.firstName} ${
                  this.state.requestorObject.lastName
                }`
              : null}
            {this.state.requestorDogName
              ? ` and ${this.state.requestorDogName}`
              : null}
          </p>
          <p>
            <span>Start Time:</span>
            {moment(this.state.startTime).format(`dddd, MMMM Do YYYY, h:mm a`)}
          </p>
          <p>
            <span>End Time:</span>
            {moment(this.state.endTime).format(`dddd, MMMM Do YYYY, h:mm a`)}
          </p>
          <p>
            <span>City: </span>
            {this.state.city}
          </p>
          <p>
            <span>State: </span>
            {this.state.state}
          </p>
          <p>
            <span>Zip Code: </span>
            {this.state.zipCode}
          </p>
          <p>
            <span>Location: </span>
            {this.state.location}
          </p>
          <p>
            <span>Details: </span>
            {this.state.details}
          </p>
          <p className={this.statusColor()}>
            <span className={this.statusColor()}>Status: </span>
            {this.state.status}
          </p>
          <div className="d-flex justify-content-center">
            {this.props.showStatusChangeButton ? (
              <button
                className="btn btn-success"
                onClick={this.approvePlayDate}
              >
                Approve
              </button>
            ) : null}
            {this.props.showStatusChangeButton ? (
              <button className="btn btn-danger" onClick={this.denyPlayDate}>
                Deny
              </button>
            ) : null}
          </div>
        </div>
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
