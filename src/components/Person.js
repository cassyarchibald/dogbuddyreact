import React from "react";
import PropTypes from "prop-types";
import "./Person.css";

const Person = props => {
  return <h2>{props.firstName}</h2>;
};

Person.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string
  // dogs here
  // playdates here ?
};

export default Person;
