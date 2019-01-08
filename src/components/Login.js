import React from "react";
import PropTypes from "prop-types";
import CreateProfile from "./CreateProfile";
import Dashboard from "./Dashboard";
import "./Login.css";

const Login = props => {
  console.log("in login");
  return (
    <header>
      <div className="wrapper">
        {props.user ? (
          <button onClick={props.logoutCallback}>Logout</button>
        ) : (
          <button onClick={props.loginCallback}>Log In</button>
        )}
      </div>
    </header>
  );
};

export default Login;
