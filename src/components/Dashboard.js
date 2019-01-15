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
    //console.log(this.props);
  }

  render() {
    return (
      <div className="container">
        <div id="dashboard-container">
          <h1>Welcome</h1>
          {this.state.currentUserObject ? (
            <section id="user-information">
              <h2>
                {this.state.currentUserObject.firstName}{" "}
                {this.state.currentUserObject.lastName}
              </h2>
              <p>{this.state.currentUserObject.city}</p>
              <p>{this.state.currentUserObject.state}</p>

              <p>{this.state.currentUserObject.zipCode}</p>

              <p>{this.state.currentUserObject.about}</p>
              <p>{this.state.currentUserObject.photo}</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    showEditUserForm: !this.state.showEditUserForm
                  });
                }}
              >
                Edit Profile
              </button>
            </section>
          ) : null}

          {this.state.currentUserObject && this.state.showEditUserForm ? (
            <EditUserForm
              editPersonCallback={this.props.editPersonCallback}
              person={this.state.currentUserObject}
            />
          ) : null}
          <h2>Dogs</h2>
          <section className="user-dogs">
            {this.state.dogs ? this.state.dogs : null}
          </section>
          <section className="user-playdates">
            <h2>Requested Playdates</h2>
            {this.state.requestedPlaydates
              ? this.state.requestedPlaydates
              : null}
          </section>
          <section className="user-playdates">
            <h2>Recieved Playdates</h2>
            {this.state.recievedPlaydates ? this.state.recievedPlaydates : null}
          </section>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            this.setState({ showAddDogForm: !this.state.showAddDogForm });
          }}
        >
          {this.state.showAddDogForm ? "Hide Form" : "Add Dog"}
        </button>
        {this.state.showAddDogForm ? (
          <NewDogForm addDogCallback={this.props.addDogCallback} />
        ) : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  addPersonCallback: PropTypes.func
};
export default Dashboard;
