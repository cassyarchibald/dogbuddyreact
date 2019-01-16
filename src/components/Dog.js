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
      gender: this.props.gender,
      vaccinated: this.props.vaccinated,
      about: this.props.about,
      photo: this.props.photo,
      preferredPlayBuddy: this.props.preferredPlayBuddy,
      owner: "",
      ownerLink: this.props.ownerLink,
      errorMessages: [],
      showOwner: this.props.showOwner,
      zipCode: "",
      showOwnerCallback: this.props.showOwnerCallback,
      showAddPlayDateForm: false,
      showAddPlayDateButton: true,
      showEditDogForm: false
    };
    console.log(props);
  }
  loadOwner() {
    axios
      .get(this.state.ownerLink)
      .then(response => {
        // Add owner to state
        let owner = (
          <Person
            key={`${response.data.firstName}${response.data.resourceId}`}
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

        if (
          this.state.owner &&
          this.state.currentUserObject &&
          this.state.owner.props.id === this.state.currentUserObject.resourceId
        ) {
          this.setState({ showAddPlayDateButton: false });
        }

        if (this.state.isLoggedIn === false) {
          this.setState({
            showAddPlayDateButton: false
          });
        }
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
      <div className="col-sm-6">
        <div className="card dog-card">
          <h3 className="text-center" id="dog-name">
            {this.state.name}
          </h3>
          <div className="text-center">
            <img
              src={`${this.state.photo}`}
              alt={`${this.state.name}'`}
              className="img-thumbnail mx-auto"
            />
          </div>
          <div className="dog-information">
            <p>
              <span>Age:</span>
              {this.state.age}
            </p>
            <p>
              <span>Gender:</span>
              {this.state.gender}
            </p>
            <p>
              <span>Size:</span>
              {this.state.size}
            </p>
            <p>
              <span>Breed:</span>
              {this.state.breed}
            </p>

            <p>
              <span>Vaccinated:</span>
              {`${this.state.vaccinated}`}
            </p>
            <p>
              <span>About:</span>
              {this.state.about}
            </p>
            <p>
              <span>Preferred Play Buddy:</span>
              {this.state.preferredPlayBuddy}
            </p>
            <div className="d-flex justify-content-center">
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
            </div>

            {this.state.owner && this.state.showEditDogForm ? (
              <EditDogForm
                editDogCallback={this.props.editDogCallback}
                dog={this.props}
              />
            ) : null}

            {this.state.isLoggedIn && this.state.showAddPlayDateButton ? (
              <div className="d-flex justify-content-center mb-1">
                <button
                  className="btn btn-primary mb-1"
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
              </div>
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
        </div>
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
  gender: PropTypes.string,
  preferredPlayBuddy: PropTypes.string,
  addPlayDateCallback: PropTypes.func,
  editDogCallback: PropTypes.func,
  removeDogCallback: PropTypes.func
};

export default Dog;
