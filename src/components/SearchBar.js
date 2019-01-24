import React, { Component } from "react";
import PropTypes from "prop-types";
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: "",
      radius: null
    };
  }
  onSearchChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
    console.log(newState);
    console.log(this.state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSearchCallback(this.state.zipCode, this.state.radius);
    console.log(this.state);
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="text-center">
        <div className="form-group " id="search-container">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            onChange={this.onSearchChange}
            value={this.state.zipCode}
            name="zipCode"
            className="search-bar"
            placeholder="Zip Code"
            id="zipCode"
          />
          <label htmlFor="radius">Miles</label>
          <input
            type="number"
            min="0"
            max="100"
            onChange={this.onSearchChange}
            value={this.state.radius ? this.state.radius : 5}
            name="radius"
            className="search-bar"
            placeholder="Radius"
          />
          <input className="btn btn-info" type="submit" name="submit" />
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearchCallback: PropTypes.func.isRequired
};

export default SearchBar;
