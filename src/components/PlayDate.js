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
      recievingDogImage: this.props.recievingDogImage,
      requestorDogImage: null,
      recieverObject: null,
      requestorObject: null,
      alertMessage: []
    };
    console.log(this.props);
    console.log(this.state);
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
        this.loadPlayDateRequestorDogImage();
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
        this.loadPlayDateRecieverDogImage();
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  loadPlayDateRequestorDogImage() {
    console.log("loading reciever dog image");
    axios
      .get(
        `http://dogbuddyapi.herokuapp.com/dogs/search/findByName?name=${
          this.state.requestorDogName
        }`
      )
      .then(response => {
        this.setState({
          requestorDogImage: response.data._embedded.dogs[0].photo
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  loadPlayDateRecieverDogImage() {
    console.log("loading reciever dog image");
    axios
      .get(
        `http://dogbuddyapi.herokuapp.com/dogs/search/findByName?name=${
          this.state.recievingDogName
        }`
      )
      .then(response => {
        this.setState({
          recievingDogImage: response.data._embedded.dogs[0].photo
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
    // loading reciever also loads reciever dogs/the recieving dog's photo
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
      <div className="col-lg-6 playDate">
        <div className="card">
          <h4 duration={5000} className="alertMessage text-center">
            {this.state.alertMessage}
          </h4>
          <div className="playdate-grid-container">
            <h4>Let's Play!</h4>
            <p className="requestor-info">
              <h4>To</h4>
              {this.state.recievingDogImage && (
                <img
                  className="recieving-dog-photo img-fluid max-width: 100% height: auto img-thumbnail"
                  alt="recieving dog"
                  src={this.state.recievingDogImage}
                />
              )}
              {this.state.recieverObject
                ? `${this.state.recieverObject.firstName} ${
                    this.state.recieverObject.lastName
                  }`
                : null}
              {this.state.recievingDogName
                ? ` and ${this.state.recievingDogName}`
                : null}
            </p>

            <p className="reciever-info">
              <h4>From</h4>
              {this.state.requestorDogImage && (
                <img
                  className="requestor-dog-photo img-fluid max-width: 100% height: auto img-thumbnail"
                  alt="requestor dog"
                  src={this.state.requestorDogImage}
                />
              )}
              {this.state.requestorObject
                ? `${this.state.requestorObject.firstName} ${
                    this.state.requestorObject.lastName
                  }`
                : null}
              {this.state.requestorDogName
                ? ` and ${this.state.requestorDogName}`
                : null}
            </p>
            <section className="playdate-content-container">
              <section className="playdate-details">
                <p>
                  <h4>When</h4>
                  {moment(this.state.startTime).format(`LL`)},
                  {moment(this.state.startTime).format(`LT`)} to{" "}
                  {moment(this.state.endTime).format(`LT`)}
                </p>
                <h4>Where</h4>
                <p>
                  {this.state.city} {this.state.state} {this.state.zipCode}
                </p>
                <p>{this.state.location}</p>
                <p>
                  <h4>Details: </h4>
                  {this.state.details}
                </p>
                <p className={this.statusColor()}>
                  <h4 className={this.statusColor()}>Status: </h4>
                  {this.state.status}
                </p>
              </section>

              <div className="d-flex justify-content-center update-status">
                {this.props.showStatusChangeButton ? (
                  <button
                    className="btn btn-success approve-btn"
                    onClick={this.approvePlayDate}
                  >
                    Approve
                  </button>
                ) : null}
                {this.props.showStatusChangeButton ? (
                  <button
                    className="btn btn-danger deny-btn"
                    onClick={this.denyPlayDate}
                  >
                    Deny
                  </button>
                ) : null}
              </div>
            </section>
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
