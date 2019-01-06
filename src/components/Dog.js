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
    preferredPlayBuddy,
    personLink
  } = props;

  return (
    <div className="card d-inline-block">
      <h3 className="text-center">{name}</h3>
      <p>Age:{age}</p>
      <p>size:{size}</p>
      <p>breed:{breed}</p>
      <p>vaccinated:{vaccinated}</p>
      <p>about:{about}</p>
      <p>Preferred Play Buddy:{preferredPlayBuddy}</p>
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
