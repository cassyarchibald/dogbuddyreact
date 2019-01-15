import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import axios from "axios";
import NewDogForm from "./NewDogForm";
import Dog from "./Dog";
import EditUserForm from "./EditUserForm";

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
      requestorObject: this.props.requestorObject
    };
  }

  render() {
    // TODO QUESTION
    // Not updating when I use the edit form
    // data is tied to the currentUserObject
    // received via props
    let currentUserObject = this.props.currentUserObject;
    return (
      <div className="container">
        <div id="dashboard-container">
          <h1>Welcome</h1>
          {currentUserObject ? (
            <section id="user-information">
              <h2>
                {currentUserObject.firstName} {currentUserObject.lastName}
              </h2>
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
            <h2 className="w-100">Requested Playdates</h2>
            {this.props.currentUserRequestedPlayDates
              ? this.props.currentUserRequestedPlayDates
              : null}
          </section>
          <section className="user-playdates row mt-5">
            <h2 className="w-100">Recieved Playdates</h2>
            {this.props.currentUserRecievedPlayDates
              ? this.props.currentUserRecievedPlayDates
              : null}
          </section>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  addPersonCallback: PropTypes.func
};
export default Dashboard;
