import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewDogForm.css";

class EditDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.dog.id,
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
      id: this.state.id,
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
    this.props.editDogCallback(updatedDog, updatedDog.id);
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
              type="number"
            />
          </div>
          <div className="form-group">
            <input
              type="radio"
              name="size"
              value="Small"
              onChange={this.onInputChange}
              checked={this.state.size === "Small"}
            />
            Small
            <input
              type="radio"
              name="size"
              value="Medium"
              onChange={this.onInputChange}
              checked={this.state.size === "Medium"}
            />
            Medium
            <input
              type="radio"
              name="size"
              value="Large"
              onChange={this.onInputChange}
              checked={this.state.size === "Large"}
            />
            Large
          </div>
          <div className="form-group">
            <input
              type="radio"
              name="vaccinated"
              value="true"
              onChange={this.onInputChange}
              checked={this.state.vaccinated === true}
            />
            True
            <input
              type="radio"
              name="vaccinated"
              value="false"
              onChange={this.onInputChange}
              checked={this.state.vaccinated === false}
            />
            False
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
            <label htmlFor="photo">Photo</label>
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
