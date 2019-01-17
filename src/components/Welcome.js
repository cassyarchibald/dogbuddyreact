import React from "react";
import PropTypes from "prop-types";
import "./Welcome.css";
import dogsplaying from "../img/dogsplaying.jpg";

const Welcome = props => {
  return (
    <section className="welcome-container">
      <header>
        <div className="header-container">
          <div className="headline-text-container">
            <h1>Welcome To DogBuddy!</h1>
          </div>
        </div>
      </header>
      <section id="welcome-statement">
        <h1>Find your dog a playmate today!</h1>
      </section>
      <h2 className="mb-1">How It Works</h2>
      <section id="welcome-details">
        <section
          className="welcome-detail-container"
          id="first-detail-container"
        >
          <h3>Create a profile</h3>
          <p>Create profile and tell use about your dog</p>
        </section>
        <section
          className="welcome-detail-container"
          id="second-detail-container"
        >
          <h3>Find playmates nearby</h3>
          <p>View profiles of dogs in your area</p>
        </section>
        <section className="welcome-detail-container">
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
