import React from "react";
import PropTypes from "prop-types";
import "./Person.css";

const Person = props => {
  const {
    firstName,
    lastName,
    city,
    state,
    zipCode,
    about,
    photo,
    addUserCallback,
    dogLink
  } = props;

  // Do axios request to render person's dogs
  return (
    <div className="card d-inline-block">
      <h3 className="text-center">
        {firstName} {lastName}
      </h3>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Zip Code: {zipCode}</p>
      <p>About: {about}</p>
    </div>
  );
};

Person.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string,
  addUserCallback: PropTypes.func
  // dogs here
  // playdates here ?
};

export default Person;
