import React from "react";
import PropTypes from "prop-types";
import "./Welcome.css";
import dogsplaying from "../img/dogsplaying.jpg";
import signup from "../img/signup.jpg";
import personanddog from "../img/personanddog.png";
import magnifier from "../img/magnifier.png";

const Welcome = props => {
  return (
    <section className="welcome-container">
      <header>
        <div className="header-container">
          <div className="headline-text-container">
            <h1 id="welcome-heading">Welcome To DogBuddy!</h1>
          </div>
        </div>
      </header>
      <section id="welcome-statement">
        <h2 id="welcome-subheading">Find your dog a playmate today!</h2>
      </section>
      <h2 id="welcome-how-heading">How It Works</h2>
      <section id="welcome-details">
        <section
          className="welcome-detail-container"
          id="first-detail-container"
        >
          <img src={signup} alt="person icon" />
          <h3>Create a profile</h3>
          <p>Create profile and tell us about your dog</p>
        </section>
        <section
          className="welcome-detail-container"
          id="second-detail-container"
        >
          <img src={magnifier} alt="magnifying glass" />
          <h3>Find playmates nearby</h3>
          <p>View profiles of dogs in your area</p>
        </section>
        <section className="welcome-detail-container">
          <img src={personanddog} alt="icon of person and dog" />
          <h3>Meetup</h3>
          <p>
            Find the right playmate for your pup? Reach out to setup a playdate!
          </p>
        </section>
      </section>
    </section>
  );
};

Welcome.propTypes = {};

export default Welcome;
