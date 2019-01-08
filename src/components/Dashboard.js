import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";
import axios from "axios";
import NewDogForm from "./NewDogForm";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      persons: this.props.persons
    };
  }

  addPerson = newPerson => {
    axios
      .post("http://localhost:8080/persons", newPerson)
      .then(response => {
        let updatedData = this.state.persons;
        updatedData.push(newPerson);
        this.setState({ persons: updatedData });
      })
      .catch(error => {
        this.setState({ alertMessage: error.message });
      });
  };

  componentDidMount() {
    // find by id via api call -
    // if person logged in, try to find them
    // if not found - direct to registration form
    // else, good to go - dashboard
    // pass uer object data from user -
    // hidden field
    // Part from input/part from oauth,
    // save when form is filled out
    // only see that form if information is incomplete

    console.log("component did mount dashboard");
    // check if already in system
    let filterResult = this.state.persons.filter(
      person => person.id === this.state.user.uid
    );

    if (filterResult.length === 0) {
      console.log("empty");
      console.log(this.props.addPersonCallback);
    } else {
      console.log("filter result not empty");
      console.log(filterResult);
    }
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

Dashboard.propTypes = {
  addPersonCallback: PropTypes.func
};
export default Dashboard;
