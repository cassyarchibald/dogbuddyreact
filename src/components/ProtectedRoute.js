import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// is logged in but no profile = create profile
// is not logged in = log in
// if logged in/has profile - can access route

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    console.log("In protected route method");
    console.log(props);
    console.log("Value of isLoggedIn");
    console.log(this.props.isLoggedIn);
    console.log("Value of profile created");
    console.log(this.props.profileCreated);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      profileCreated: this.props.profileCreated
      //authenticated: this.props.isLoggedIn && this.props.profileCreated
    };
  }
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={
          (props =>
            this.state.isLoggedIn && this.state.profileCreated
              ? (console.log("render componenet, is logged in"),
                <Component {...props} />) // either not logged in or profile not created
              : // if not logged in, redirect to login
                console.log("Not logged in, redirect to login"),
          this.state.isLoggedIn === false ? (
            <Redirect to="/login" />
          ) : (
            // otherwise we assume they are logged in but have no profile
            // created
            <Redirect to="createProfile" />
          ))
        }
      />
    );
  }
}

export default ProtectedRoute;