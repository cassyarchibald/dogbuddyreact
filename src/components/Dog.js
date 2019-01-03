import React from "react";
import PropTypes from "prop-types";
import "./Dog.css";

const Dog = () => {
  return <h2>Dog</h2>;
};

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
