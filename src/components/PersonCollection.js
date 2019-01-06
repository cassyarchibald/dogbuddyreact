import React from "react";
import PropTypes from "prop-types";
import Person from "./Person";
import "./PersonCollection.css";

const PersonCollection = props => {
  if (props.persons.length > 0) {
    let persons = props.persons;
    return (
      <section>
        <div className="componentcontainer">{persons}</div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="componentcontainer">Loading</div>
      </section>
    );
  }
};

PersonCollection.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  about: PropTypes.string,
  photo: PropTypes.string,
  addUserCallback: PropTypes.func
};

export default PersonCollection;
