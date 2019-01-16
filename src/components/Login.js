import React from "react";
import PropTypes from "prop-types";
//import CreateProfile from "./CreateProfile";
//import Dashboard from "./Dashboard";
import "./Login.css";
import CreateProfile from "./CreateProfile";

const Login = props => {
  let showCreateProfileForm = false;

  if (props.isLoggedIn && props.profileCreated === false) {
    showCreateProfileForm = true;
  }

  return (
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
      {showCreateProfileForm
        ? (console.log("show form"),
          (
            <CreateProfile
              uid={props.uid}
              addPersonCallback={props.addPersonCallback}
            />
          ))
        : console.log("don't show form")}
    </div>
  );
};

Login.propTypes = {
  loginCallback: PropTypes.func
};

export default Login;
