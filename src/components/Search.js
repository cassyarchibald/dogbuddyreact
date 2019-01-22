import React, { Component } from "react";
import SearchList from "./SearchList";
import SearchBar from "./SearchBar";
import axios from "axios";
import "./SearchBar.css";
import "./Search.css";
import PropTypes from "prop-types";

const BASE_URL = process.env.REACT_APP_HOST_URL;
const KEY = process.env.REACT_APP_API_KEY;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      dogs: this.props.dogs,
      zipCodesInRadius: [],
      alertMessage: ""
    };
  }
  onSearchChange = (zipCode, radius) => {
    if (zipCode === "") {
      this.setState({
        alertMessage: "Please enter a zip code"
      });
    } else {
      this.setState({
        alertMessage: this.state.alertMessage.replace(
          "Please enter a search term",
          ""
        )
      });
      // Do request to get zip codes
      // use helper method to get search results
      // this.listResults(query);
      this.getZipCodes(zipCode, radius);
    }
  };

  getZipCodes = (zipCode, radius) => {
    if (radius === null) {
      radius = 5;
    }
    this.request_url =
      process.env.REACT_APP_HOST_URL +
      "/" +
      process.env.REACT_APP_CLIENT_KEY +
      "/radius.json/" +
      `${zipCode}` +
      "/" +
      `${radius}` +
      "/mile?minimal";

    console.log(this.request_url);
    axios
      .get(this.request_url)

      .then(response => {
        console.log(response.data.zip_codes);
        this.setState({
          zipCodesInRadius: response.data.zip_codes
        });

        if (response.data.zip_codes < 1) {
          this.setState({
            alertMessage: "No Results Found For Entered Zip Code and Radius"
          });
        } else {
          this.findDogsWithinZipCodes();
        }
      })
      .catch(error => {
        this.setState({
          alertMessage: error.message
        });
      });
  };

  findDogsWithinZipCodes = () => {
    //console.log("find dogs within zip code");
    // clear out dogs from last result search
    this.setState({
      resultList: []
    });
    // loop through zip codes
    // call backend to push dog results
    // into results array in state
    this.state.zipCodesInRadius.forEach(zipCode => {
      // call backend for dogs that have owner's with zipcode
      axios
        .get(
          `https://dogbuddyapi.herokuapp.com/dogs/search/findByPerson_ZipCode?zipCode=${zipCode}`
        )

        .then(response => {
          // console.log("response data for a zip code");
          // console.log(response.data._embedded.dogs);
          // update the state
          this.setState({
            resultList: this.state.resultList.concat(
              response.data._embedded.dogs
            )
          });
        })
        .catch(error => {
          this.setState({
            alertMessage: error.message
          });
        });
    });
  };

  render() {
    return (
      <section className="search-container">
        <h4 className="alertMessage text-center">{this.state.alertMessage}</h4>

        <SearchBar onSearchCallback={this.onSearchChange} />
        <h3>
          {this.state.resultList.length > 0 &&
            `There are ${this.state.resultList.length} dogs near you`}
        </h3>
        <SearchList
          resultList={this.state.resultList}
          addDogCallback={this.props.addDogCallback}
          editDogCallback={this.props.editDogCallback}
          currentUserObject={this.props.currentUserObject}
          removeDogCallback={this.props.removeDogCallback}
          isLoggedIn={this.props.isLoggedIn}
          addPlayDateCallback={this.props.addPlayDateCallback}
        />
      </section>
    );
  }
}

Search.propTypes = {
  addDogCallback: PropTypes.func,
  editDogCallback: PropTypes.func,
  removeDogCallback: PropTypes.func,
  resultList: PropTypes.array,
  isLoggedIn: PropTypes.bool
};

export default Search;
