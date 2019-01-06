import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dog.css";
import Person from "./Person";
import "./Person.css";
import axios from "axios";

class Dog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      age: this.props.age,
      size: this.props.size,
      breed: this.props.breed,
      vaccinated: this.props.vaccinated,
      about: this.props.about,
      preferredPlayBuddy: this.props.preferredPlayBuddy,
      owner: "",
      ownerLink: this.props.personLink,
      errorMessages: [],
      showOwner: false,
      zipCode: ""
    };
  }

  loadOwner() {
    axios
      .get(this.state.ownerLink)
      .then(response => {
        // Add owner to state
        let owner = (
          <Person
            key={response.data.resourceId}
            id={response.data.resourceId}
            firstName={response.data.firstName}
            lastName={response.data.lastName}
            city={response.data.city}
            state={response.data.state}
            zipCode={response.data.zipCode}
            about={response.data.about}
            photo={response.data.photo}
            dogLink={response.data._links.dogs.href}
          />
        );
        this.setState({
          owner: owner,
          zipCode: response.data.zipCode
        });
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }

  componentDidMount() {
    this.loadOwner();
  }

  showOwner = () => {
    this.setState({ showOwner: !this.state.showOwner });
  };

  render() {
    return (
      <div className="card d-inline-block">
        <h3 className="text-center">{this.state.name}</h3>
        <p>Age:{this.state.age}</p>
        <p>size:{this.state.size}</p>
        <p>breed:{this.state.breed}</p>
        <p>vaccinated:{this.state.vaccinated}</p>
        <p>about:{this.state.about}</p>
        <p>Preferred Play Buddy:{this.state.preferredPlayBuddy}</p>
        <button onClick={this.showOwner} className="btn">
          {this.state.showOwner ? "Hide Owner" : "Show Owner"}
        </button>
        <div>{this.state.showOwner ? this.state.owner : null}</div>
      </div>
    );
  }
}

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
