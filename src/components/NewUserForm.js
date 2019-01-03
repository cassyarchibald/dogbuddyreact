import React, { Component } from "react";
import "./NewUserForm.css";

class NewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zipCode: "",
      about: "",
      milesWillingToDrive: "",
      gender: "",
      errorMessages: []
    };
  }
  onInputChange = event => {
    console.log("In on input change");

    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
  };

  onFormSubmit = event => {
    event.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      About: this.state.about,
      milesWillingToDrive: this.state.milesWillingToDrive,
      gender: this.state.gender
    };

    // Need to add the user
    this.props.addUserCallback(newUser);
    this.setState({ errorMessages: [] });
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
        <form className="new-user-form" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={this.state.firstName}
              name="firstName"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={this.state.lastName}
              name="lastName"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              value={this.state.city}
              name="city"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              value={this.state.state}
              name="state"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">zipCode</label>
            <input
              value={this.state.zipCode}
              name="zipCode"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="milesWillingToDrive">milesWillingToDrive</label>
            <input
              value={this.state.milesWillingToDrive}
              name="milesWillingToDrive"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="about">About</label>
            <input
              value={this.state.about}
              name="about"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <input
              value={this.state.gender}
              name="gender"
              onChange={this.onInputChange}
            />
          </div>
          <input type="submit" value="Create Profile" />
        </form>
      </div>
    );
  }
}

export default NewUserForm;
