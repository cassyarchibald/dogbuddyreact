import React, { Component } from "react";
import "./CreateProfile.css";
import PropTypes from "prop-types";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zipCode: "",
      about: "",
      errorMessages: []
    };
    console.log(this.props.uid);
  }

  onInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
  };

  onFormSubmit = event => {
    event.preventDefault();

    const newPerson = {
      uid: this.state.uid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      about: this.state.about
    };

    // Need to add the user to the parent collection/do post request
    this.props.addPersonCallback(newPerson);
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
        <form className="new-user-form container" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              value={this.state.firstName}
              className="form-control"
              name="firstName"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              value={this.state.lastName}
              className="form-control"
              name="lastName"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              value={this.state.city}
              className="form-control"
              name="city"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              value={this.state.state}
              className="form-control"
              name="state"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              value={this.state.zipCode}
              className="form-control"
              name="zipCode"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="about">About</label>
            <input
              value={this.state.about}
              className="form-control"
              name="about"
              onChange={this.onInputChange}
            />
          </div>

          <input
            type="submit"
            value="Create Profile"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  addPersonCallback: PropTypes.func
};

export default CreateProfile;
