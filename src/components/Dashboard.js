import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import axios from "axios";
import NewDogForm from "./NewDogForm";
import Dog from "./Dog";
import EditUserForm from "./EditUserForm";

let viewPlayDates = "View All Playdates";
let viewByStatus = "All";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      dogs: this.props.currentUserDogs,
      requestedPlaydates: this.props.currentUserRequestedPlayDates,
      recievedPlaydates: this.props.currentUserRecievedPlayDates,
      currentUserObject: this.props.currentUserObject,
      isLoggedIn: this.props.isLoggedIn,
      showAddDogForm: false,
      showEditUserForm: false,
      recieverObject: this.props.recieverObject,
      requestorObject: this.props.requestorObject,
      viewPlayDates: "View All Playdates",
      viewByStatus: "All"
    };
  }

  onViewPlayDatesChange = event => {
    viewPlayDates = event.target.value;
    this.setState({ viewPlayDates: event.target.value });
  };

  onViewStatusChange = event => {
    viewByStatus = event.target.value;
    this.setState({ viewByStatus: event.target.value });
  };

  statusFilter = playDates => {
    if (viewByStatus === "All") {
      return playDates;
    } else if (viewByStatus === "Pending") {
      // filter playdates by status
      let result = playDates.filter(playdate => {
        return playdate.props.status === "Pending";
      });
      return result;
    } else if (viewByStatus === "Approved") {
      let result = playDates.filter(playdate => {
        return playdate.props.status === "Approved";
      });
      return result;
    } else if (viewByStatus === "Denied") {
      let result = playDates.filter(playdate => {
        return playdate.props.status === "Denied";
      });
      return result;
    }
  };

  filteredRequestedPlayDates = () => {
    return this.props.currentUserRequestedPlayDates
      ? this.statusFilter(this.props.currentUserRequestedPlayDates)
      : null;
  };

  filteredRecievedPlayDates = () => {
    return this.props.currentUserRecievedPlayDates
      ? this.statusFilter(this.props.currentUserRecievedPlayDates)
      : null;
  };

  showPlayDates = () => {
    if (viewPlayDates === "View All Playdates") {
      return (
        <section className="user-playdates row mt-5">
          <h2 className="w-100">Requested Playdates</h2>
          {this.filteredRequestedPlayDates()}
          <h2 className="w-100 mt-5">Recieved Playdates</h2>
          {this.filteredRecievedPlayDates()}
        </section>
      );
    } else if (viewPlayDates === "View Requested Playdates") {
      return (
        <section className="user-playdates row mt-5">
          <h2 className="w-100">Requested Playdates</h2>
          {this.filteredRequestedPlayDates()}
        </section>
      );
    } else if (viewPlayDates === "View Recieved Playdates") {
      return (
        <section className="user-playdates row mt-5">
          <h2 className="w-100">Recieved Playdates</h2>
          {this.filteredRecievedPlayDates()}
        </section>
      );
    } else {
      console.log(viewPlayDates);
    }
  };

  requestedPlayDateData = () => {
    // loop through requested play dates if there are any
    // return data in json format?
    if (this.props.requestedPlaydates) {
      let playDateData = this.props.requestedPlaydates.map(playdate => {
        // how to access the owner of each from playdate?
        // happens during playdate mount/lives in playdate state
        return {
          startTime: playdate.props.startTime,
          endTime: playdate.props.endTime,
          city: playdate.props.city,
          state: playdate.props.state,
          zipCode: playdate.props.zipCode,
          status: playdate.props.status,
          location: playdate.props.location,
          details: playdate.props.details,
          requestorDogName: playdate.props.requestorDogName,
          recievingDogName: playdate.props.recievingDogName
        };
      });
      return playDateData;
    }
  };

  render() {
    // TODO QUESTION
    // Not updating when I use the edit form
    // data is tied to the currentUserObject
    // received via props
    let currentUserObject = this.props.currentUserObject;

    let recievedPlayDateData = false;

    return (
      <div id="dashboard-container">
        {currentUserObject ? (
          <section id="user-information">
            <h2>
              {`${currentUserObject.firstName} ${currentUserObject.lastName}`}
            </h2>
            <img
              src={`${currentUserObject.photo}`}
              alt={`${currentUserObject.firstName}`}
              className="img-thumbnail "
            />
            <p>{currentUserObject.city}</p>
            <p>{currentUserObject.state}</p>

            <p>{currentUserObject.zipCode}</p>

            <p>{currentUserObject.about}</p>
            <p>{currentUserObject.photo}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({
                  showEditUserForm: !this.state.showEditUserForm
                });
                console.log(this.state.showEditUserForm);
                console.log(this.props.currentUserObject);
              }}
            >
              Edit Profile
            </button>
          </section>
        ) : null}

        {this.props.currentUserObject && this.state.showEditUserForm ? (
          <EditUserForm
            editPersonCallback={this.props.editPersonCallback}
            person={this.props.currentUserObject}
          />
        ) : null}
        <h2>Dogs</h2>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({ showAddDogForm: !this.state.showAddDogForm });
            }}
          >
            {this.state.showAddDogForm ? "Hide Form" : "Add Dog"}
          </button>
        </div>

        {this.state.showAddDogForm ? (
          <NewDogForm addDogCallback={this.props.addDogCallback} />
        ) : null}
        <section className="user-dogs row mt-5">
          {this.props.currentUserDogs ? this.props.currentUserDogs : null}
        </section>

        <section className="user-playdates row mt-5">
          <section className="dropdowns">
            <select
              className="viewPlayDates"
              onChange={this.onViewPlayDatesChange}
            >
              <option>View All Playdates</option>
              <option>View Requested Playdates</option>
              <option>View Recieved Playdates</option>
            </select>
            <select className="viewByStatus" onChange={this.onViewStatusChange}>
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Denied</option>
            </select>
          </section>
        </section>
        {this.showPlayDates()}
      </div>
    );
  }
}

Dashboard.propTypes = {
  addPersonCallback: PropTypes.func
};
export default Dashboard;
