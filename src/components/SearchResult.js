import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchResult.css";
import axios from "axios";
import NewPlayDateForm from "./NewPlayDateForm";
import Person from "./Person";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: "",
      isLoggedIn: this.props.isLoggedIn,
      currentUserObject: this.props.currentUserObject,
      showAddPlayDateButton: true,
      photo: this.props.photo,
      owner: null
    };
    console.log(props);
  }
  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  loadOwner() {
    console.log("loading owner");
    axios
      .get(this.props._links.person.href)
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
        console.log("adding owner to state");
        this.setState({
          owner: owner,
          zipCode: response.data.zipCode
        });
        console.log(this.state.owner.props.id);
        console.log(this.state.currentUserObject.resourceId);

        if (
          this.state.owner &&
          this.state.currentUserObject &&
          this.state.owner.props.id === this.state.currentUserObject.resourceId
        ) {
          console.log(this.state.owner.props.id);
          console.log(this.state.currentUserObject.resourceId);
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
    console.log(message);
  };

  componentDidMount() {
    this.loadOwner();
  }

  render() {
    console.log(this.state);
    return (
      <div className="col-sm-6">
        <div className="card dog-card">
          <h3 className="text-center" id="dog-name">
            {this.props.name}
          </h3>
          <div className="text-center">
            <img
              src={`${this.props.photo}`}
              alt={`${this.props.name}'`}
              className="img-thumbnail mx-auto"
            />
          </div>
          <div className="dog-information">
            <p>
              <span>Age:</span>
              {this.props.age}
            </p>
            <p>
              <span>Gender:</span>
              {this.props.gender}
            </p>
            <p>
              <span>Size:</span>
              {this.props.size}
            </p>
            <p>
              <span>Breed:</span>
              {this.props.breed}
            </p>

            <p>
              <span>Vaccinated:</span>
              {this.props.vaccinated ? "Yes" : "No"}
            </p>
            <p>
              <span>About:</span>
              {this.props.about}
            </p>
            <p>
              <span>Preferred Play Buddy:</span>
              {this.props.preferredPlayBuddy}
            </p>

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
                recievingDogName={this.props.name}
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
SearchResult.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  size: PropTypes.string,
  breed: PropTypes.string,
  vaccinated: PropTypes.bool,
  about: PropTypes.string,
  preferredPlayBuddy: PropTypes.string,
  addPlayDateCallback: PropTypes.func
};

export default SearchResult;
