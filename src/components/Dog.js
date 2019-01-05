import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dog.css";

const Dog = props => {
  const {
    id,
    name,
    age,
    size,
    breed,
    vaccinated,
    about,
    photo,
    preferredPlayBuddy
  } = props;
  return (
    <div className="card d-inline-block">
      <h3 className="text-center">{name}</h3>
      <p>{age}</p>
      <p>{size}</p>
      <p>{breed}</p>
      <p>{vaccinated}</p>
      <p>{about}</p>
      <p>{preferredPlayBuddy}</p>
    </div>
  );
};

Dog.propTypes = {
  id: PropTypes.number,
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
