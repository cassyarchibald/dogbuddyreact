import React from "react";
import PropTypes from "prop-types";
import "./Welcome.css";

const Welcome = props => {
  return (
    <section className="welcome-container">
      <header>
        <h1>Welcome To DogBuddy!</h1>
      </header>
      <section id="welcome-statement">
        <h1>Find your dog a playmate today!</h1>
      </section>
      <section id="welcome-details">
        <h2>How It Works</h2>
        <section className="welcome-detail-container">
          <h3>Create a profile</h3>
          <p>Create profile and tell use about your dog</p>
        </section>
        <section className="welcome-detail-container">
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
