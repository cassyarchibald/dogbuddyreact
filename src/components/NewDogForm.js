import React, { Component } from "react";
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

  onFormSubmit = event => {
    event.preventDefault();

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
    this.props.addDogCallback(newDog);
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
        <form className="new-dog-form" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={this.state.name}
              name="name"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              value={this.state.age}
              name="age"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="size">Size</label>
            <input
              value={this.state.size}
              name="size"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              value={this.state.vaccinated}
              name="vaccinated"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">about</label>
            <input
              value={this.state.about}
              name="about"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="photo">photo</label>
            <input
              value={this.state.photo}
              name="photo"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="breed">Breed</label>
            <input
              value={this.state.breed}
              name="breed"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <label htmlFor="preferredPlayBuddy">preferredPlayBuddy</label>
            <input
              value={this.state.preferredPlayBuddy}
              name="gender"
              onChange={this.onInputChange}
            />
          </div>
          <input type="submit" value="Create Dog Profile" />
        </form>
      </div>
    );
  }
}

export default NewDogForm;
