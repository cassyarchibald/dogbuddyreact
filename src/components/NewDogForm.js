import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewDogForm.css";

// How does it know who the owner is?
// Would need to be the person that is logged in
class NewDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      size: "",
      vaccinated: "",
      about: "",
      photo: "",
      breed: "",
      preferredPlayBuddy: "",
      owner: "",
      gender: "",
      errorMessages: []
    };
  }
  onInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;
    console.log(field);
    console.log(value);
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
      gender: "",
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
      gender,
      breed,
      preferredPlayBuddy,
      owner
    } = this.state;

    if (
      name === "" ||
      age === "" ||
      size === "" ||
      vaccinated === "" ||
      about === "" ||
      breed === "" ||
      preferredPlayBuddy === "" ||
      gender === ""
    ) {
      console.log("problem");
      return;
    }
    const newDog = {
      name: this.state.name,
      age: this.state.age,
      size: this.state.size,
      vaccinated: this.state.vaccinated,
      about: this.state.about,
      photo: this.state.photo,
      breed: this.state.breed,
      gender: this.state.gender,
      preferredPlayBuddy: this.state.preferredPlayBuddy
    };
    console.log(newDog);
    console.log(this.props);

    // Need to add the dog to state and do post request
    // to /dogs then reload the dogs/persons...
    this.props.addDogCallback(newDog);
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
        <form
          id="dog-form"
          className="new-dog-form w-75"
          onSubmit={this.onFormSubmit}
        >
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
              onChange={this.onInputChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
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
              onChange={this.onInputChange}
            />
            Small
            <input
              type="radio"
              name="size"
              value="Medium"
              onChange={this.onInputChange}
            />
            Medium
            <input
              type="radio"
              name="size"
              value="Large"
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
              onChange={this.onInputChange}
            />
            True
            <input
              type="radio"
              name="vaccinated"
              value="false"
              onChange={this.onInputChange}
            />
            False
          </div>
          <div>
            <label htmlFor="about">About</label>
            <textarea
              value={this.state.about}
              className="form-control"
              name="about"
              onChange={this.onInputChange}
              rows="3"
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
            <textarea
              value={this.state.preferredPlayBuddy}
              className="form-control"
              name="preferredPlayBuddy"
              onChange={this.onInputChange}
              rows="3"
            />
          </div>
          <div className="d-flex justify-content-center btn-container">
            <input
              type="submit"
              className="btn btn-primary submit"
              value="Create Dog Profile"
            />
          </div>
        </form>
      </div>
    );
  }
}

NewDogForm.propTypes = {
  addDogCallback: PropTypes.func
};

export default NewDogForm;
