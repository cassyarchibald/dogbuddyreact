import React from "react";
import PropTypes from "prop-types";
import "./Person.css";

const Person = () => {
  return <h2>Person</h2>;
};

Person.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  milesWillingToDrive: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string,
  gender: PropTypes.string
  // dogs here
  // messages here ?
};

export default Person;
