import React from "react";
import PropTypes from "prop-types";
import PlayDate from "./PlayDate";
import "./PlayDateCollection.css";

const PlayDateCollection = props => {
  if (props.playDates.length > 0) {
    let playDate = props.playDates.map(playDate => {
      // Need to add requestor and receiver to this somehow
      return (
        <PlayDate
          key={playDate.id}
          id={playDate.id}
          startTime={playDate.lastName}
          endTime={playDate.city}
          city={playDate.state}
          state={playDate.zipCode}
          zipCode={playDate.about}
          status={playDate.status}
          addPlayDateCallback={props.addPlayDateCallback}
        />
      );
    });
    return (
      <section>
        <div className="componentcontainer">{playDate}</div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="componentcontainer">Loading</div>
      </section>
    );
  }
};

PlayDateCollection.propTypes = {
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

export default PlayDateCollection;
