import React from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";

const PlayDate = props => {
  const {
    date,
    startTime,
    endTime,
    city,
    state,
    zipCode,
    status,
    playDateCallback
  } = props;
  return (
    <div className="card d-inline-block">
      <p>Date: {date}</p>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Zip Code: {zipCode}</p>
      <p>Status: {status}</p>
    </div>
  );
};

PlayDate.propTypes = {
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  status: PropTypes.string,
  addPlayDateCallback: PropTypes.addPlayDateCallback
  // requestor here
  // responder here
};

export default PlayDate;
