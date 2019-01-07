import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import axios from "axios";
import NewDogForm from "./NewDogForm";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
    console.log("within Dashboard");
    console.log(props.user.displayName);
  }

  // look in persons array to see if user is already
  // in our system
  // if not, do a post request to create a person
  // if so, render a form with their details filled in
  // let them add/edit details that Google doesn't give us
  render() {
    return (
      <div>
        <h1>Welcome to your dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {};
export default Dashboard;
