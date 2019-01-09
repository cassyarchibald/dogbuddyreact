import React from "react";
import PropTypes from "prop-types";
import CreateProfile from "./CreateProfile";
import Dashboard from "./Dashboard";
import "./Login.css";

const Login = props => {
  return (
    <header>
      <div className="wrapper">
        {props.user ? (
          <button className="loginBtn" onClick={props.logoutCallback}>
            Logout
          </button>
        ) : (
          <button className="loginBtn--google" onClick={props.loginCallback}>
            Log In
          </button>
        )}
      </div>
    </header>
  );
};

export default Login;
