import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dog.css";

class Dog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      id: this.props.id,
      age: this.props.age,
      size: this.props.size,
      vaccinated: this.props.vaccinated,
      about: this.props.about,
      breed: this.props.breed,
      preferredPlayBuddy: this.props.preferredPlayBuddy
    };
  }
}

Dog.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  photo: PropTypes.string,
  breed: PropTypes.string,
  preferredPlayBuddy: PropTypes.string
};

export default Dog;
