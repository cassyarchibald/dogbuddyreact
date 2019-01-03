import React from "react";
import PropTypes from "prop-types";
import "./Message.css";

const Message = props => {
  const { id, to, from, subject, details, updated } = props;

  return (
    <div className="card d-inline-block">
      <h3 className="text-center">{subject}</h3>
      <div className="text-center">
        <p>{updated}</p>
        <p>To: {to}</p>
        <p>From: {from}</p>
        <p>Subject: {subject}</p>
        <p>{details}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  to: PropTypes.string,
  from: PropTypes.string,
  details: PropTypes.string,
  subject: PropTypes.string
  // updated: PropTypes.
};

export default Message;
