import React from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";

const PlayDate = props => {
  const {
    startTime,
    endTime,
    city,
    state,
    zipCode,
    status,
    location,
    details // Need requestor and responder
  } = props;
  return (
    <div className="card d-inline-block">
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Zip Code: {zipCode}</p>
      <p>Location: {location}</p>
      <p>Details: {details}</p>
      <p>Status: {status}</p>
    </div>
  );
};

PlayDate.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  status: PropTypes.string,
  details: PropTypes.string,
  location: PropTypes.string,
  addPlayDateCallback: PropTypes.addPlayDateCallback
  // requestor here
  // responder here
};

export default PlayDate;
