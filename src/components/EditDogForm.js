import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewDogForm.css";

// How does it know who the owner is?
// Would need to be the person that is logged in
class EditDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.dog.name,
      age: this.props.dog.age,
      size: this.props.dog.size,
      vaccinated: this.props.dog.vaccinated,
      about: this.props.dog.about,
      photo: this.props.dog.photo,
      breed: this.props.dog.breed,
      preferredPlayBuddy: this.props.dog.preferredPlayBuddy,
      owner: this.props.dog.owner,
      errorMessages: []
    };
  }
  onInputChange = event => {
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
      preferredPlayBuddy: "",
      owner: ""
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
      preferredPlayBuddy,
      owner
    } = this.state;

    if (name === "") return;
    // TODO - Load in owner based on who is logged in
    const updatedDog = {
      name: this.state.name,
      age: this.state.age,
      size: this.state.size,
      vaccinated: this.state.vaccinated,
      about: this.state.about,
      photo: this.state.photo,
      breed: this.state.breed,
      preferredPlayBuddy: this.state.preferredPlayBuddy
    };

    // Need to add the dog to state and do post request
    // to /dogs then reload the dogs/persons...
    this.props.addDogCallback(updatedDog);
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
        <form className="edit-dog-form" onSubmit={this.onFormSubmit}>
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
            <label htmlFor="vaccinated">Vaccinated</label>
            <input
              value={this.state.vaccinated}
              className="form-control"
              name="vaccinated"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="about">About</label>
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
              name="preferredPlayBuddy"
              onChange={this.onInputChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Update Dog" />
        </form>
      </div>
    );
  }
}

EditDogForm.propTypes = {
  addDogCallback: PropTypes.func
};

export default EditDogForm;
