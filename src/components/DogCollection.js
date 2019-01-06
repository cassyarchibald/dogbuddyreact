import React from "react";
import PropTypes from "prop-types";
import Dog from "./Dog";
import "./DogCollection.css";

const DogCollection = props => {
  let dog = props.dogComponentsCollection;
  if (props.dogComponentsCollection.length > 0) {
    return (
      <section>
        <div className="componentcontainer">{dog}</div>
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
