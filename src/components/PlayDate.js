import React from "react";
import PropTypes from "prop-types";
import "./PlayDate.css";

const PlayDate = () => {
  return <h2>PlayDate</h2>;
};

PlayDate.propTypes = {
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  status: PropTypes.string
  // requestor here
  // responder here
};

export default PlayDate;
