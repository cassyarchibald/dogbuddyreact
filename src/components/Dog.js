import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dog.css";
import Person from "./Person";
import "./Person.css";
import axios from "axios";
import NewPlayDateForm from "./NewPlayDateForm";
import EditDogForm from "./EditDogForm";

class Dog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserObject: this.props.currentUserObject,
      isLoggedIn: this.props.isLoggedIn,
      id: this.props.id,
      name: this.props.name,
      age: this.props.age,
      size: this.props.size,
      breed: this.props.breed,
      vaccinated: this.props.vaccinated,
      about: this.props.about,
      preferredPlayBuddy: this.props.preferredPlayBuddy,
      owner: "",
      ownerLink: this.props.ownerLink,
      errorMessages: [],
      showOwner: this.props.showOwner,
      zipCode: "",
      showOwnerCallback: this.props.showOwnerCallback,
      showAddPlayDateForm: false,
      showEditDogForm: false
    };
    console.log(props);
    console.log(this.state.vaccinated);
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
        //console.log(owner);
      })
      .catch(error => {
        this.changeMessage(error.message);
      });
  }
  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };
  componentDidMount() {
    this.loadOwner();
  }

  showOwner = () => {
    this.setState({ showOwner: !this.state.showOwner });
  };

  render() {
    return (
      <div className="card d-inline-block">
        <h3 className="text-center" id="dog-name">
          {this.state.name}
        </h3>
        <p>Age:{this.state.age}</p>
        <p>Size:{this.state.size}</p>
        <p>Breed:{this.state.breed}</p>
        <p>Vaccinated:{this.state.vaccinated}</p>
        <p>About:{this.state.about}</p>
        <p>Preferred Play Buddy:{this.state.preferredPlayBuddy}</p>

        {this.props.showEditDelete ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                showEditDogForm: !this.state.showEditDogForm
              });
            }}
          >
            Edit
          </button>
        ) : null}
        {this.props.showEditDelete ? (
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.removeDogCallback(this.props.id);
            }}
          >
            Delete
          </button>
        ) : null}

        {this.state.owner && this.state.showEditDogForm ? (
          <EditDogForm
            editDogCallback={this.props.editDogCallback}
            dog={this.props}
          />
        ) : null}

        {this.state.isLoggedIn ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                showAddPlayDateForm: !this.state.showAddPlayDateForm
              });
            }}
          >
            {this.state.showAddPlayDateForm
              ? "Hide Form"
              : "Send Play Date Request"}
          </button>
        ) : null}

        {this.state.showAddPlayDateForm ? (
          <NewPlayDateForm
            addPlayDateCallback={this.props.addPlayDateCallback}
            reciever={this.state.owner}
            recievingDogName={this.state.name}
            requestor={this.state.currentUserObject}
            currentUserObject={this.props.currentUserObject}
          />
        ) : null}
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
