import React from "react";
import PropTypes from "prop-types";
import SearchResult from "./SearchResult";
import "./SearchList.css";

const SearchList = props => {
  console.log(props);
  let regex = /\d/;
  const SearchList = props.resultList.map((result, i) => {
    // need to pass owner link down to search result
    return (
      <SearchResult
        {...result}
        key={`result${result.resourceId}`}
        addPlayDateCallback={props.addPlayDateCallback}
        isLoggedIn={props.isLoggedIn}
        currentUserObject={props.currentUserObject}
      />
    );
  });

  return (
    <section className="row" id="searchlist">
      {SearchList}
    </section>
  );
};

SearchList.propTypes = {
  resultList: PropTypes.array.isRequired
  //updateMoviesCallback: PropTypes.func
};

export default SearchList;
