import React from "react";
import PropTypes from "prop-types";
import NewPersonForm from "./NewPersonForm";
import Dashboard from "./Dashboard";
import "./Login.css";

const Login = props => {
  return (
    <div>
      <h1>Welcome</h1>

      <header>
        <div className="wrapper">
          {this.state.user ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Login;
