import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchResult.css";
import axios from "axios";
import NewPlayDateForm from "./NewPlayDateForm";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: "",
      isLoggedIn: this.props.isLoggedIn
    };
  }
  changeMessage = message => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 2500);
  };

  render() {
    console.log(this.props);
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

        {this.props.isLoggedIn ? (
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
