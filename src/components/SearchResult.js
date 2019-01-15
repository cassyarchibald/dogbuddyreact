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
      owner: null
    };
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
      <div className="card d-inline-block">
        <h3 className="text-center" id="dog-name">
          {this.props.name}
        </h3>
        <p>Age:{this.props.age}</p>
        <p>Size:{this.props.size}</p>
        <p>Breed:{this.props.breed}</p>
        <p>Vaccinated:{this.props.vaccinated}</p>
        <p>About:{this.props.about}</p>
        <p>Preferred Play Buddy:{this.props.preferredPlayBuddy}</p>

        {this.state.isLoggedIn && this.state.showAddPlayDateButton ? (
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
            reciever={this.props.owner}
            recievingDogName={this.props.name}
            requestor={this.props.currentUserObject}
            currentUserObject={this.props.currentUserObject}
          />
        ) : null}
      </div>
    );
  }
}
SearchResult.propTypes = {
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  imageURL: PropTypes.string.isRequired
  //updateMoviesCallback: PropTypes.func
};

export default SearchResult;
