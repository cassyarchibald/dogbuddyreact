import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewDogForm.css";

class NewDogForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      size: "",
      vaccinated: "",
      about: "",
      photo: "",
      breed: "",
      preferredPlayBuddy: "",
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

  resetState = () => {
    this.setState({
      name: "",
      age: "",
      size: "",
      vaccinated: "",
      about: "",
      photo: "",
      breed: "",
      preferredPlayBuddy: ""
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      name,
      age,
      size,
      vaccinated,
      about,
      photo,
      breed,
      preferredPlayBuddy
    } = this.state;

    if (name === "") return;

    const newDog = {
      name: this.state.name,
      age: this.state.age,
      size: this.state.size,
      vaccinated: this.state.vaccinated,
      about: this.state.about,
      photo: this.state.photo,
      breed: this.state.breed,
      preferredPlayBuddy: this.state.preferredPlayBuddy
    };

    // Need to add the user, post request?
    this.props.addDogCallback(newDog, this.state);
    this.resetState();
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
        <form className="new-dog-form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={this.state.name}
              className="form-control"
              name="name"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              value={this.state.age}
              className="form-control"
              name="age"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input
              value={this.state.size}
              className="form-control"
              name="size"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              value={this.state.vaccinated}
              className="form-control"
              name="vaccinated"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">about</label>
            <input
              value={this.state.about}
              className="form-control"
              name="about"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">photo</label>
            <input
              value={this.state.photo}
              className="form-control"
              name="photo"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Breed</label>
            <input
              value={this.state.breed}
              className="form-control"
              name="breed"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferredPlayBuddy">Preferred Play Buddy</label>
            <input
              value={this.state.preferredPlayBuddy}
              className="form-control"
              name="gender"
              onChange={this.onInputChange}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Dog Profile"
          />
        </form>
      </div>
    );
  }
}

NewDogForm.propTypes = {
  addDogCallback: PropTypes.func
};

export default NewDogForm;
