import React from "react";
import PropTypes from "prop-types";
import Person from "./Person";
import "./PersonCollection.css";

const PersonCollection = props => {
  if (props.users.length > 0) {
    let user = props.users;
    return (
      <section>
        <div className="componentcontainer">{user}</div>
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
