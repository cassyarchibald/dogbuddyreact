import React from "react";
import PropTypes from "prop-types";
import "./DogCollection.css";

const DogCollection = props => {
  let dog = props.dogComponentsCollection;
  if (props.dogComponentsCollection.length > 0) {
    return <section className="componentcontainer">{dog}</section>;
  } else if (props.dogComponentsCollection.length === 0) {
    return (
      <section>
        <h1>There are no dogs</h1>
      </section>
    );
  } else {
    return <p>Loading</p>;
  }
};

DogCollection.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  photo: PropTypes.string,
  breed: PropTypes.string,
  preferredPlayBuddy: PropTypes.string,
  addDogCallback: PropTypes.func
};

export default DogCollection;
