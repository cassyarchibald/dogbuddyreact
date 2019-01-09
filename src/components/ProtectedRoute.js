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
      profileCreated: this.props.profileCreated,
      authenticated: null
    };
  }

  render() {
    if (this.props.isLoggedIn && this.props.profileCreated) {
      this.setState({
        authenticated: true
      });
    }
    console.log("In protected route method");
    console.log(this.props);
    console.log("Value of isLoggedIn");
    console.log(this.props.isLoggedIn);
    console.log("Value of profile created");
    console.log(this.props.profileCreated);
    const { component: Component, ...props } = this.props;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );

    return (
      <Route
        {...props}
        render={
          (props =>
            this.state.authenticated
              ? (console.log("render componenet, is logged in and has profile"),
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
