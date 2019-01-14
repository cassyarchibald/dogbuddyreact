import React, { Component } from "react";
import PropTypes from "prop-types";
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: "",
      radius: ""
    };
  }
  onSearchChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSearchCallback(this.state.zipCode, this.state.radius);
    console.log(this.state);
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="text-center">
        <div className="form-group" id="search-container">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            onChange={this.onSearchChange}
            value={this.state.zipCode}
            name="zipCode"
            className="search-bar"
            placeholder="zipCode"
          />
          <label htmlFor="radius">Miles</label>
          <input
            type="text"
            onChange={this.onSearchChange}
            value={this.state.radius}
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
