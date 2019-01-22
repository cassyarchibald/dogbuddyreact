import React, { Component } from "react";
import "./CreateProfile.css";
import PropTypes from "prop-types";

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.person.uid,
      firstName: this.props.person.firstName,
      lastName: this.props.person.lastName,
      city: this.props.person.city,
      state: this.props.person.state,
      zipCode: this.props.person.zipCode,
      about: this.props.person.about,
      photo: this.props.person.photo,
      errorMessages: []
    };
    console.log(this.props);
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
    console.log("in on form submit");
    const updatedPerson = {
      uid: this.props.person.uid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      about: this.state.about,
      photo: this.state.photo
    };
    console.log(updatedPerson);
    console.log(this.props);

    // Need to add the user to the parent collection/do post request
    this.props.editPersonCallback(updatedPerson);
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
        <form className="edit-user-form w-75" onSubmit={this.onFormSubmit}>
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
            <label htmlFor="photo">Photo</label>
            <input
              value={this.state.photo}
              className="form-control"
              name="photo"
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
          <div className="form-group">
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
            <textarea
              value={this.state.about}
              className="form-control"
              name="about"
              onChange={this.onInputChange}
              rows="3"
            />
          </div>

          <input
            type="submit"
            value="Update Profile"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}

EditUserForm.propTypes = {
  addPersonCallback: PropTypes.func
};

export default EditUserForm;
