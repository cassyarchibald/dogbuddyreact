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
      gender: this.props.dog.gender,
      preferredPlayBuddy: this.props.dog.preferredPlayBuddy,
      owner: this.props.dog.owner,
      errorMessages: []
    };
    console.log(this.props.dog.gender);
    console.log(this.props.dog.vaccinated);
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
      gender: "",
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
      gender,
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
      gender: this.state.gender,
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
            <label htmlFor="gender">Gender</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={this.state.gender === "Male"}
              onChange={this.onInputChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={this.state.gender === "Female"}
              onChange={this.onInputChange}
            />
            Female
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input
              type="radio"
              name="size"
              value="Small"
              checked={this.state.size === "Small"}
              onChange={this.onInputChange}
            />
            Small
            <input
              type="radio"
              name="size"
              value="Medium"
              checked={this.state.size === "Medium"}
              onChange={this.onInputChange}
            />
            Medium
            <input
              type="radio"
              name="size"
              value="Large"
              checked={this.state.size === "Large"}
              onChange={this.onInputChange}
            />
            Large
          </div>
          <div className="form-group">
            <label htmlFor="vaccinated">Vaccinated</label>
            <input
              type="radio"
              name="vaccinated"
              value="true"
              checked={this.state.vaccinated === true}
              onChange={this.onInputChange}
            />
            True
            <input
              type="radio"
              name="vaccinated"
              value="false"
              checked={this.state.vaccinated === false}
              onChange={this.onInputChange}
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
