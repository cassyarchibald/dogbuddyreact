import React from "react";
import PropTypes from "prop-types";
import Dog from "./Dog";
import "./DogCollection.css";

const DogCollection = props => {
  if (props.dogs.length > 0) {
    let dog = props.dogs.map(dog => {
      return (
        <Dog
          key={dog.id}
          id={dog.id}
          name={dog.name}
          age={dog.age}
          size={dog.size}
          vaccinated={dog.vaccinated}
          about={dog.about}
          photo={dog.photo}
          breed={dog.breed}
          preferredPlayBuddy={dog.preferredPlayBuddy}
        />
      );
    });
    return (
      <section>
        <div className="componentcontainer">{dog}</div>
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

DogCollection.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  photo: PropTypes.string,
  breed: PropTypes.string,
  preferredPlayBuddy: PropTypes.string
};

export default DogCollection;
